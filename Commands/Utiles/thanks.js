const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("thanks")
            .setDescription("👌 Remercie un membre du serveur.")
            .addSubcommand(cmd => cmd
                .setName("add")
                .setDescription("👌 Remercie un membre du serveur.")
                .addUserOption(option => option
                    .setName("membre")
                    .setDescription("👤 Choisissez un membre à remercier.")
                    .setRequired(true)
                )
                .addStringOption(option => option 
                    .setName("raison")
                    .setDescription("📝 Indiquez une raison.")
                ))
            .addSubcommand(cmd => cmd
                .setName("get")
                .setDescription("🔎 Regardez les remerciements d'un membre.")
                .addUserOption(option => option
                    .setName("membre")
                    .setDescription("👤 Choisissez un membre à remercier.")
                    .setRequired(true)  
                )
            )
            .addSubcommand(cmd => cmd
                .setName("leaderboard")
                .setDescription("🏆 Obtenez la liste des membres les plus remerciés du serveur !")),
    async execute(client, interaction) {
        const cmd = interaction.options.getSubcommand();
        const target = interaction.options.getMember("membre")?.user
        let reason = "";
        if (interaction.options.getString("raison")) reason = `\n \n **📝 Raison indiquée:** \n > ${interaction.options.getString("raison")}`

        switch (cmd) {
            case "add":
                if (target.id === interaction.user.id) return interaction.reply({content: `❌ Ah ouais l'égo surdimensionné quoi 👀`, ephemeral: true})
                if (!db.get(`${target?.id}.thanks`)) {
                    await db.set(`${target.id}.thanks`, 1)
                } else {
                    await db.add(`${target.id}.thanks`, 1 );
                }

                const thanks = db.get(`${target?.id}.thanks`);

                const addEmbed = new MessageEmbed()
                    .setAuthor(`${target.tag} a été remercié !`, target.displayAvatarURL())
                    .setDescription(`👥 **${target.tag}** remercié par **${interaction.user.tag}** ! \n \n 🏆 C'est son **${thanks > 1 ? `${thanks}ème` : `${thanks}er`} remerciement** ! ${reason}`)
                    .setColor(client.successColor)
                    .setFooter(`Remercié par ${interaction.user.username}`, interaction.user.displayAvatarURL())
                    .setTimestamp()

                client.channels.cache.get("922545697113407518").send({embeds: [addEmbed], content: `<@!${target.id}> vient d'être remercié !`})
                interaction.reply({content: "✅ Remerciement effectué !", ephemeral: true})
                break;
            case "get":
                const thanks2 = db.get(`${target?.id}.thanks`);

                const getEmbed = new MessageEmbed()
                    .setAuthor(`Remerciements de ${target.tag} !`, target.displayAvatarURL())
                    .setDescription(`<@!${target.id}> ${!thanks2 ? "n'a **aucun** remerciement" : thanks2 === 1 ? `a **${thanks2}** remerciement` : `a **${thanks2}** remerciements`} !`)
                    .setColor(client.defaultColor)
                    .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
                    .setTimestamp()
                
                interaction.reply({embeds: [getEmbed]})
                break;
            case "leaderboard":
                let sorted = [];
                const top3 = []
                
                db.all().forEach(table => {
                    if (table.data.thanks) sorted.push(table.data.thanks)
                })

                sorted = sorted.sort((a, b) => a - b).reverse()

                for (let i = 0; i < sorted.length; i = i) {
                    db.all().forEach(table => {
                        const thx = table.data.thanks;
                        if (thx === sorted[i] && thx !== undefined) {
                            top3.push(table.ID)
                            i++;
                        }
                    })
                }

                let txt = '> Aucun remerciement obtenu !';
                let n = 1;
                top3.forEach(id => {
                    let medal = '';
                    switch (n) {
                        case 1:
                            medal = '🥇'
                            break;
                        case 2:
                            medal = '🥈'
                            break;

                        case 3:
                            medal = '🥉'
                            break;

                        default:
                            medal = `**${n}.**`
                            break;
                    }

                    txt === '> Aucun remerciement obtenu !' ? txt = `> ${medal} <@!${id}> avec **${db.get(`${id}.thanks`) > 1 ? `${db.get(`${id}.thanks`)} remerciements` : `${db.get(`${id}.thanks`)} remerciement` } !** \n` :  txt += `> ${medal} <@!${id}> avec **${db.get(`${id}.thanks`) > 1 ? `${db.get(`${id}.thanks`)} remerciements` : `${db.get(`${id}.thanks`)} remerciement` } !** \n` ;
                    n++
                })

                const embed = new MessageEmbed()
                    .setAuthor('LeaderBoard des remerciements !', interaction.guild.iconURL())
                    .setDescription(`**🏆 Voici les membres les plus remerciés !** \n ${txt}`)
                    .setColor(client.defaultColor)
                    .setFooter(`Leaderboard du serveur ${interaction.guild.name}`, interaction.guild.iconURL())

                interaction.reply({embeds: [embed]})
            default:
                break;
        }
    },
    userPerms: [],
    userPermsFR: []
}