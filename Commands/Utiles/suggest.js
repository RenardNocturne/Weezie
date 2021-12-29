const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("suggest")
            .setDescription("📮 Envoyez vos suggestions pour le serveur et pour Weezie !")
            .addStringOption(option => option
                .setName("description")
                .setDescription("📝 Décrivez votre suggestion !")
                .setRequired(true)
            ),
    async execute(client, interaction) {

        let total = 0, accepted = 0, declined = 0, none = 0;
        let hasVoted = {};

        async function collectInteraction (msg, i) {
            if (i.customId !== "repSuggest") {
                if (Object.keys(hasVoted).includes(i.user.id)) {
                    i.reply({content: "❌ Vous avez déjà voter !", ephemeral: true})
                } else {
                    eval(`Object.assign(hasVoted, {${i.user.id}: \`${i.customId}\`})`)
                    i.reply({content: "✅ Vote comptabilisé !", ephemeral: true})
                    eval(i.customId + "+= 1");
                    total += 1;

                    const newEmbed = new MessageEmbed()
                        .setAuthor("Suggestion !", interaction.guild.iconURL())
                        .setDescription(`**📝 Contenu:** \n ${suggest} \n \n ✅ **Approuvée à ${Math.round(accepted/total*100)}%** \n \n 🏳 **Neutre à ${Math.round(none/total*100)}%** \n \n ❌ **Déclinée à ${Math.round(declined/total*100)}%** \n \n *${total} participants !*`)
                        .setColor(client.defaultColor)
                        .setFooter(`Suggestion de ${interaction.user.username}`, interaction.user.displayAvatarURL())
                    msg.edit({embeds: [newEmbed]})
                }
                msg.awaitMessageComponent()
                .then(int => collectInteraction(msg, int))
                .catch(err => console.log(err))
            } else if (i.customId === "repSuggest") {
                if (i.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && Object.keys(hasVoted).includes(i.user.id)) {                    
                    const msgFilter = m => m.author.id === i.user.id
                    let response = "";
                    
                    const repEmbed = new MessageEmbed()
                        .setTitle("📝 Répondre !")
                        .setDescription("Quelle réponse souhaitez vous apporter ?")
                        .setFooter(`Demandée par ${i.user.username}`, i.user.displayAvatarURL())
                        .setColor(client.defaultColor)
                    
                    await i.reply({embeds: [repEmbed], fetchReply: true})
                    .then(async msg => {
                        await msg.channel.awaitMessages({filter: msgFilter, max: 1})
                        .then(collected => {
                            response = collected.first().content
                            collected.first().delete().catch(err => console.log(err))
                            msg.delete().catch(err => console.log(err))
                        })
                    })

                    const newEmbed = new MessageEmbed()
                        .setAuthor("Suggestion !", interaction.guild.iconURL())
                        .setDescription(`**📝 Contenu:** \n ${suggest} \n \n **📜 Réponse apportée:** \n ${response} \n \n ✅ **Approuvée à ${Math.round(accepted/total*100)}%** \n \n 🏳 **Neutre à ${Math.round(none/total*100)}%** \n \n ❌ **Déclinée à ${Math.round(declined/total*100)}%** \n \n *${total} participants !*`)
                        .setColor(Object.values(hasVoted)[Object.keys(hasVoted).indexOf(i.user.id)] === "accepted" ? client.successColor : Object.values(hasVoted)[Object.keys(hasVoted).indexOf(i.user.id)] === "declined" ? client.errorColor : "ffffff") //Oui c'est n'imp ALED !
                        .setFooter(`Suggestion de ${interaction.user.username}`, interaction.user.displayAvatarURL())
                    msg.edit({embeds: [newEmbed], components: []})

                } else if (i.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    i.reply({content: "❌ Vous n'avez pas encore voté !", ephemeral: true})
                    msg.awaitMessageComponent()
                    .then(int => collectInteraction(msg, int))  
                } else {
                    i.reply({content: "❌ Vous n'avez pas la permission requise !", ephemeral: true})
                    msg.awaitMessageComponent()
                    .then(int => collectInteraction(msg, int))
                }
            }
        }

        const suggest = interaction.options.getString("description")

        const embed = new MessageEmbed()
            .setAuthor(`Suggestion !` , interaction.guild.iconURL())
            .setDescription(`**📝 Contenu:** \n ${suggest}`)
            .setFooter(`Suggestion de ${interaction.user.username}`, interaction.user.displayAvatarURL())
            .setColor(client.defaultColor)
        
        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("Pour !")
                    .setCustomId(`accepted`)
                    .setStyle("SUCCESS"),

                new MessageButton()
                    .setLabel("Neutre")
                    .setCustomId(`none`)
                    .setStyle("SECONDARY"),

                new MessageButton()
                    .setLabel("Contre !")
                    .setCustomId(`declined`)
                    .setStyle("DANGER"),

                new MessageButton()
                    .setLabel("Répondre !")
                    .setCustomId(`repSuggest`)
                    .setStyle("PRIMARY")
            ])

        client.channels.cache.get("925757934972047360").send({embeds: [embed], components: [row]})
        .then(msg => {
            interaction.reply({content: `✅ [Suggestion](${msg.url}) envoyé !`, ephemeral: true})
            msg.awaitMessageComponent()
            .then(i => {
                collectInteraction(msg, i)
            })
            .catch(err => console.log(err))
        })
    },
    userPerms: [],
    userPermsFR: []
}