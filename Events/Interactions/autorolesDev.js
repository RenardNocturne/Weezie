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
        .setDescription("Afin d'**améliorer ton expérience** sur notre serveur, veille à choisir tes **rôles** ! \n \n Ceux-ci te donneront accès à certains salons ainsi, si tu développe en Kotlin tu ne seras pas embêté.e par les salons comme Discord.JS ! ✨ \n \n *💡 Pour retirer un rôle il te suffit de le resélectonner !*")
        .setFooter("Système d'autorôle de " + interaction.guild.name, interaction.guild.iconURL())
        .setImage("attachment://Roles.png")
        .setColor(client.defaultColor);

    const row = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
                .setCustomId('autorolesDev')
                .setPlaceholder('Choisissez vos rôles !')
                .setMaxValues(7)
                .addOptions([
                    {
                        label: 'Web Frontend',
                        emoji: '📜',
                        value: '922229734476234753',
                        description: 'Pour les développeurs Web Frontend !'
                    },
                    {
                        label: 'Web Backend',
                        emoji: '⚙',
                        value: '922230043005030421',
                        description: 'Pour les développeurs Web Backend !'
                    },
                    {
                        label: 'JavaScript',
                        emoji: '<:JS:825850725183258624>',
                        value: '922229136892780565',
                        description: 'Pour les développeurs JavaScript !'
                    },
                    {
                        label: 'Python',
                        emoji: '<:Python:825853269607579648>',
                        value: '922229302475501569',
                        description: 'Pour les développeurs Python !'
                    },
                    {
                        label: 'C/C#/C++/...',
                        emoji: '<:C_:922511770873135194>',
                        value: '922229433056780348',
                        description: 'Pour les développeurs C/C#/C++/...'
                    },
                    {
                        label: 'Java/Kotlin',
                        emoji: '<:Java:835411957733130252>',
                        value: '922229560131588136',
                        description: 'Pour les développeurs Java/Kotlin !'
                    },
                    {
                        label: 'Autres',
                        emoji: '📚',
                        value: '922230212069064725',
                        description: 'Pour les développeurs d\'un langages absent !'
                    },
                ])    
        ])

    interaction.message.edit({embeds: [embed], components: [row]})
}