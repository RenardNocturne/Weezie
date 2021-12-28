const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("poll")
            .setDescription("📊 Vous permet de créer des sondages !")
            .addStringOption(option => option
                .setName("question")
                .setDescription("📝 Décrivez la question.")
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("option1")
                .setDescription("1️⃣ Ajoutez une possibilité.")
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("option2")
                .setDescription("2️⃣ Ajoutez une possibilité.")
                .setRequired(true)
            ),
    async execute(client, interaction) {
        const question = interaction.options.getString("question")
        const opt1 = interaction.options.getString("option1")
        const opt2 = interaction.options.getString("option2")

        let total = 0, option1 = 0, option2 = 0, none = 0;

        const hasVoted = [] 

        async function collectInteraction (msg, i) {
            if (i.customId !== "endPoll") {
                if (hasVoted.includes(i.user.id)) {
                    i.reply({content: "❌ Vous avez déjà voter !", ephemeral: true})
                } else {
                    hasVoted.push(i.user.id)
                    i.reply({content: "✅ Vote comptabilisé !", ephemeral: true})
                    eval(i.customId + "+= 1");
                    total += 1;

                    const newEmbed = new MessageEmbed()
                        .setAuthor("Sondage !", interaction.guild.iconURL())
                        .setDescription(`**❓ Question:** ${question} \n \n 1️⃣ **Option 1:** ${opt1} \`${option1/total*100}%\` \n \n 🏳 **Neutre à ${none/total*100}%** \n \n 2️⃣ **Option 2:** ${opt2} \`${option2/total*100}%\` \n \n *${total} participants !*`)
                        .setColor(client.defaultColor)
                        .setFooter(`Sondage de ${interaction.user.username}`, interaction.user.displayAvatarURL())
                    msg.edit({embeds: [newEmbed]})
                }
                msg.awaitMessageComponent({componentFilter})
                .then(int => collectInteraction(msg, int))
            } else if (i.customId === "endPoll") {
                if (i.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                    const newEmbed = new MessageEmbed()
                        .setAuthor("Sondage !", interaction.guild.iconURL())
                        .setDescription(`**❓ Question:** ${question} \n \n 1️⃣ **Option 1:** ${opt1} \`${option1/total*100}%\` \n \n 🏳 **Neutre à ${none/total*100}%** \n \n 2️⃣ **Option 2:** ${opt2} \`${option2/total*100}%\` \n \n *${total} participants !*`)
                        .setColor(client.successColor)
                        .setFooter(`Sondage de ${interaction.user.username}`, interaction.user.displayAvatarURL())
    
                    msg.edit({embeds: [newEmbed], components: []})
                } else {
                    i.reply("❌ Vous n'avez pas la permission requise !")
                    msg.awaitMessageComponent({componentFilter})
                    .then(int => collectInteraction(msg, int))
                }
            }
        }

        const componentFilter =  i => {
            if (i.customId !== "endPoll") {
                if (hasVoted.contains(i.user.id)) return i.reply({content: "❌ Vous avez déjà voter !", ephemeral: true})
                hasVoted.push(i.user.id)
                i.reply({content: "✅ Vote comptabilisé !", ephemeral: true})
            }
        }   

        const embed = new MessageEmbed()
            .setAuthor("Sondage !", interaction.guild.iconURL())
            .setDescription(`**❓ Question:** ${question} \n \n 1️⃣ **Option 1:** ${opt1} \n \n 2️⃣ **Option 2:** ${opt2}`)
            .setColor(client.defaultColor)
            .setFooter(`Sondage de ${interaction.user.username}`, interaction.user.displayAvatarURL())

        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("Option 1")
                    .setCustomId(`option1`)
                    .setStyle("PRIMARY"),

                new MessageButton()
                    .setLabel("Neutre")
                    .setCustomId(`none`)
                    .setStyle("SECONDARY"),

                new MessageButton()
                    .setLabel("Option 2")
                    .setCustomId(`option2`)
                    .setStyle("PRIMARY"),

                new MessageButton()
                    .setLabel("Terminer !")
                    .setCustomId(`endPoll`)
                    .setStyle("DANGER")
            ])

        client.channels.cache.get("825768407697326140").send({content: 'Notification pour <@&922505401981861898> !', embeds: [embed], components: [row]})
        .then(msg => {
            interaction.reply({content: `✅ [Sondage](${msg.url}) envoyé !`, ephemeral: true})
            msg.awaitMessageComponent({componentFilter})
            .then(i => {
                collectInteraction(msg, i)
            })
        })
    },  
    userPerms: [Permissions.FLAGS.MANAGE_CHANNELS],
    userPermsFR: ["Gérer les salons"]
}