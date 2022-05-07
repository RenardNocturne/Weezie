const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "acceptedRequest",
    async execute (client, interaction) {
        const target = client.guilds.cache.get(client.config.IDs.guilds).members.cache.get(interaction.customId.split("/")[1]);

        if (!interaction.member.roles.cache.has(client.config.IDs.roles.users)) return interaction.reply({content: `❌ Vous n'avez pas accepté le <#${client.config.IDs.channels.reglement}> !`, ephemeral: true})
        
        //On return si il a pas accepté ou que c'est la même personne
        if (target.id === interaction.user.id) return interaction.reply({content: "❌ Vous ne pouvez pas accepter votre propre requête !", ephemeral: true})

        await interaction.guild.channels.create(`requête-de-${target.user.username}`, {
            type: 'text',
            topic: `**${interaction.user.username}** a accepté la mission de **${target.user.username}** !`,
            position: 0,
            reason: "Requête acceptée !",
            parent: client.config.IDs.categories.requests,
            permissionOverwrites: [
                {
                    id: interaction.guild.id, //everyone
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id, //Celui qui a accepté
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: target.id, // La target
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: client.config.IDs.roles.mods, //Modo
                    allow: ['VIEW_CHANNEL']
                },
            ],
        }).then(async newChannel => {
            const embed = new MessageEmbed()
                .setAuthor('Requête acceptée !', target.user.displayAvatarURL())
                .setDescription(`[Requête de **${target.user.tag}**](${interaction.message.url}) acceptée par **${interaction.user.tag}** ! \n \n *Une fois la requête accomplie, <@!${interaction.user.id}> cliquez sur le bouton "Terminer !"*`)
                .setColor(client.successColor)
                .setThumbnail('https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/169842009/original/46a0b436c0aee26427e93e58dcc839a5d5002f9f/give-a-python-ticket-system-for-discord-bot.png')
                .setFooter(`Requête acceptée par ${interaction.user.username}`, interaction.user.avatarURL())
                .setTimestamp();
            
            const row = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setLabel("Terminer !")
                        .setCustomId("requestFinished/" + target.id)
                        .setStyle("SUCCESS")
                ])

            await newChannel.send({embeds: [embed], components: [row], content: `<@!${target.id}>, Votre requête a été acceptée !`})
            .then(msg => msg.pin().catch(err => client.error(err)))

            interaction.reply({content: `✅ Requête acceptée ! Allez voir le ticket <#${newChannel.id}> !`, ephemeral: true})

            const acceptedEmbed = interaction.message.embeds[0].setFooter(`Requête acceptée par ${interaction.user.tag}`, interaction.user.displayAvatarURL()).setColor(client.successColor)
            const acceptedRow = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setDisabled()
                        .setLabel("Accepter !")
                        .setStyle("SUCCESS")
                        .setCustomId("none")
                ])
            interaction.message.edit({embeds: [acceptedEmbed], components: [acceptedRow]})
        })
    }
}