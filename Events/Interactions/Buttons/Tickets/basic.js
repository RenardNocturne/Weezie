const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js")

module.exports =  {
    name: "basic",
    async execute (client, interaction) {
        interaction.deferUpdate()
        
        let data = {
            reason: undefined,
            date: undefined
        }

        const msgFilter = m => m.author.id === interaction.user.id && m.content.length > 0

        const startedRow = new MessageActionRow().addComponents([interaction.message.components[0].components[0].setDisabled(true), interaction.message.components[0].components[1].setDisabled(true)])
        interaction.message.edit({components: [startedRow]})
        
        const reasonEmbed = new MessageEmbed()
            .setAuthor("Liaison en cours !", interaction.user.displayAvatarURL())
            .setDescription("Bonjour ! \n Nous allons te poser une courte série de question auxquelles tu devras répondre afin de te faire entrer en contact avec le staff: \n \n **1ère Question:** \n Pourrais-tu préciser la raison de l'ouverture de ce ticket ?")
            .setColor(client.defaultColor)
            .setFooter( `Liaison en cours...`, interaction.guild.iconURL())
        
        await interaction.channel.send({embeds: [reasonEmbed]})
            .then(async msg => { 
                await msg.channel.awaitMessages({filter: msgFilter, max: 1})
                    .then(m => {
                        data.reason = m.first().content
                        m.first().delete().catch(err => client.error(err))
                    })

                const dateEmbed = new MessageEmbed()
                    .setAuthor("Liaison en cours !", interaction.user.displayAvatarURL())
                    .setDescription(`Bonjour ! \n Nous allons te poser une courte série de question auxquelles tu devras répondre afin de te faire entrer en contact avec le staff: \n \n **2ème Question:** \n Depuis quand es-tu sur le serveur (approximativement) ?`)
                    .setColor(client.defaultColor)
                    .setFooter( `Liaison en cours...`, interaction.guild.iconURL())

                await msg.edit({embeds: [dateEmbed]})
                    .then(async editedMsg => await editedMsg.channel.awaitMessages({filter: msgFilter, max: 1}))
                        .then(m => {
                            data.date = m.first().content
                            m.first().delete().catch(err => client.error(err))
                        })

                const endedEmbed = new MessageEmbed()
                    .setAuthor("Liaison en cours !", interaction.user.displayAvatarURL())
                    .setDescription(`Votre demande a bien été prise en compte !\n Merci de patienter le temps qu'un membre du staff vienne à vous ! \n \n **📜 Raison.s**: ${data.reason} \n \n **💎 Sur le serveur depuis:** ${data.date}`)
                    .setColor(client.successColor)
                    .setFooter( `Liaison en cours...`, interaction.guild.iconURL())

                await msg.edit({embeds: [endedEmbed]})
                
                const endedRow = new MessageActionRow()
                    .addComponents([
                        interaction.message.components[0].components[0].setDisabled(false), 
                    ])

                interaction.message.edit({components: [endedRow]})
            })
            
    }
}
