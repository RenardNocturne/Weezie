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
        .setAuthor("Autorôles !", interaction.guild.iconURL())
        .setDescription("Afin d'**améliorer ton expérience** sur notre serveur, veille à choisir tes **rôles** ! \n\n Ceux-ci te permettront d'être mentionné.e lors de certaines annonces ! ✨ \n \n Ils te donneront aussi accès à certains salons ainsi, si tu développe en Kotlin tu ne seras pas embêté.e par les salons comme Discord.JS ! <a:Check:845300903095566338> \n \n 💡 Pour retirer un rôle il te suffit de le resélectonner !")
        .setFooter("Système d'autorôle de " + interaction.guild.name, interaction.guild.iconURL())
        .setImage("attachment://Roles.png")
        .setColor(client.defaultColor);

    const notifsRow = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
                .setCustomId('autoroles')
                .setPlaceholder('📯 Choisissez vos notifications !')
                .setMaxValues(5)
                .addOptions([
                    {
                        label: 'Annonces',
                        emoji: '📯',
                        value: `${client.config.IDs.roles.announcementsNotifs}`,
                        description: 'Tu seras mentionné lors d\'annonces sur le serveur !'
                    },
                    {
                        label: 'Serveur',
                        emoji: '👥',
                        value: `${client.config.IDs.roles.serverNotifs}`,
                        description: 'Tu seras mentionné lors de modifications sur le serveur !'
                    },
                    {
                        label: 'Giveaways',
                        emoji: '🎁',
                        value: `${client.config.IDs.roles.giveawaysNotifs}`,
                        description: 'Tu seras mentionné lors de giveaways !'
                    },
                    {
                        label: 'Streams',
                        emoji: '<:Twitch:975818205081763940>',
                        value: `${client.config.IDs.roles.streamsNotifs}`,
                        description: 'Tu seras mentionné lors de streams !'
                    },
                    {
                        label: 'Sondages',
                        emoji: '📊',
                        value: `${client.config.IDs.roles.pollsNotifs}`,
                        description: 'Tu seras mentionné lors de sondages !'
                    },
                    {
                        label: 'Partenariats',
                        emoji: '📩',
                        value: `${client.config.IDs.roles.partenairesNotifs}`,
                        description: 'Tu seras mentionné lors de partenariats !'
                    },
                ])    
        ])
        
    const rolesRow = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
                .setCustomId('autorolesDev')
                .setPlaceholder('🧬 Choisissez vos rôles !')
                .setMaxValues(7)
                .addOptions([
                    {
                        label: 'Web Frontend',
                        emoji: '📜',
                        value: `${client.config.IDs.roles.frontend}`,
                        description: 'Pour les développeurs Web Frontend !'
                    },
                    {
                        label: 'Web Backend',
                        emoji: '⚙',
                        value: `${client.config.IDs.roles.backend}`,
                        description: 'Pour les développeurs Web Backend !'
                    },
                    {
                        label: 'JavaScript',
                        emoji: '<:JS:825850725183258624>',
                        value: `${client.config.IDs.roles.javascript}`,
                        description: 'Pour les développeurs JavaScript !'
                    },
                    {
                        label: 'Python',
                        emoji: '<:Python:825853269607579648>',
                        value: `${client.config.IDs.roles.python}`,
                        description: 'Pour les développeurs Python !'
                    },
                    {
                        label: 'Java/Kotlin',
                        emoji: '<:Java:835411957733130252>',
                        value: `${client.config.IDs.roles.java}`,
                        description: 'Pour les développeurs Java/Kotlin !'
                    },
                    {
                        label: 'C/C++',
                        emoji: '<:C_:922511770873135194>',
                        value: `${client.config.IDs.roles.c}`,
                        description: 'Pour les développeurs C/C++'
                    },
                    {
                        label: 'C#',
                        emoji: '<:csharp:835413910286237716>',
                        value: `${client.config.IDs.roles.csharp}`,
                        description: 'Pour les développeurs C#'
                    },
                    {
                        label: 'Autres',
                        emoji: '📚',
                        value: `${client.config.IDs.roles.others}`,
                        description: 'Pour les développeurs d\'un langages absent !'
                    },
                ])    
        ])

    interaction.message.edit({embeds: [embed], components: [notifsRow, rolesRow]})
}
