const { MessageAttachment, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = (client, interaction) => {
    interaction.values.forEach(value => {
        if (!interaction.member.roles.cache.has(value)) {
            interaction.member.roles.add(value)
        } else {
            interaction.member.roles.remove(value)
        }
    })
    interaction.reply({content: 'Vos rôles ont été mis à jours !', ephemeral: true});
        
    const embed = new MessageEmbed()
    .setAuthor("Autorôles", interaction.guild.iconURL())
    .setDescription("Afin d'**améliorer ton expérience** sur notre serveur, veille à choisir tes **rôles** ! \n \n Ceux-ci te permettront d'être mentionné.e lors de certaines annonces ! ✨ \n \n *💡 Pour retirer un rôle il te suffit de le resélectonner !*")
        .setFooter("Système d'autorôle de " + interaction.guild.name, interaction.guild.iconURL())
        .setImage("attachment://Roles.png")
        .setColor(client.defaultColor);

    const row = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
                .setCustomId('autoroles')
                .setPlaceholder('Choisissez vos rôles !')
                .setMaxValues(5)
                .addOptions([
                    {
                        label: 'Annonces',
                        emoji: '📯',
                        value: '849313732785733732',
                        description: 'Tu seras mentionné lors d\'annonces sur le serveur !'
                    },
                    {
                        label: 'Serveur',
                        emoji: '👥',
                        value: '922505944972263474',
                        description: 'Tu seras mentionné lors de modifications sur le serveur !'
                    },
                    {
                        label: 'Giveaways',
                        emoji: '🎁',
                        value: '922505653837242388',
                        description: 'Tu seras mentionné lors de giveaways !'
                    },
                    {
                        label: 'Sondages',
                        emoji: '📊',
                        value: '922505401981861898',
                        description: 'Tu seras mentionné lors de sondages !'
                    },
                    {
                        label: 'Partenariats',
                        emoji: '📩',
                        value: '859031598590459924',
                        description: 'Tu seras mentionné lors de partenariats !'
                    },
                ])    
        ])

        interaction.message.edit({embeds: [embed], components: [row]})
}