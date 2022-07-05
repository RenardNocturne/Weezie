const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js")

module.exports =  {
    name: "report",
    async execute (client, interaction) {
        interaction.deferUpdate()
        
        let data = {
            reason: undefined,
            date: Math.round(interaction.member.joinedTimestamp / 1000),
            screens: []
        }

        const msgFilter = m => m.author.id === interaction.user.id && m.content.length > 0
        const imgFilter = m => m.author.id === interaction.user.id  && m.attachments.size > 0 

        const startedRow = new MessageActionRow().addComponents([interaction.message.components[0].components[0].setDisabled(true), interaction.message.components[0].components[1].setDisabled(true)])
        interaction.message.edit({components: [startedRow]})
        
        const reasonEmbed = new MessageEmbed()
            .setAuthor("Liaison en cours !", interaction.member.displayAvatarURL())
            .setDescription("Bonjour ! \n Nous allons te poser une courte série de question auxquelles tu devras répondre afin de te faire entrer en contact avec le staff: \n \n **1ère Question:** \n Pourrais-tu apporter des précisions à ce signalement ?")
            .setColor(client.config.colors.default)
            .setFooter( `Liaison en cours...`, interaction.guild.iconURL())
        
        await interaction.channel.send({embeds: [reasonEmbed]})
            .then(async msg => { 
                await msg.channel.awaitMessages({filter: msgFilter, max: 1})
                    .then(m => {
                        data.reason = m.first().content
                        m.first().delete().catch(err => client.error(err))
                    })

                const screenEmbed = new MessageEmbed()
                    .setAuthor("Liaison en cours !", interaction.member.displayAvatarURL())
                    .setDescription(`Bonjour ! \n Nous allons te poser une courte série de question auxquelles tu devras répondre afin de te faire entrer en contact avec le staff: \n \n **2ème Question:** \n Pourrais-tu apporter un ou plusieurs screen.s en guise de preuve.s ?`)
                    .setColor(client.config.colors.default)
                    .setFooter( `Liaison en cours...`, interaction.guild.iconURL())

                await msg.edit({embeds: [screenEmbed]})
                    .then(async editedMsg => await editedMsg.channel.awaitMessages({filter: imgFilter, max: 1}))
                        .then(m => {
                            m.first().attachments.forEach(attachment => {
                                data.screens.push(new MessageAttachment(attachment.url))
                            })
                            m.first().delete().catch(err => client.error(err))
                        })
                    
                const endedEmbed = new MessageEmbed()
                    .setAuthor("Liaison en cours !", interaction.member.displayAvatarURL())
                    .setDescription(`Votre demande a bien été prise en compte !\n Merci de patienter le temps qu'un membre du staff vienne à vous ! \n \n **📜 Description**: ${data.reason} \n \n **💎 A rejoint le serveur** <t:${data.date}:R> \n \n **📸 Screenshots:** \`Voir-ci dessous\``)
                    .setColor(client.config.colors.success)
                    .setFooter( `Liaison en cours...`, interaction.guild.iconURL())

                await msg.delete().catch(err => client.error(err))
                await msg.channel.send({embeds: [endedEmbed]})
                msg.channel.send({files: data.screens})

                const endedRow = new MessageActionRow()
                    .addComponents([
                        interaction.message.components[0].components[0].setDisabled(false), 
                    ])

                interaction.message.edit({components: [endedRow]})
            })
            
    }
}
