const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, MessageSelectMenu, Permissions } = require("discord.js")
const config = require('../../Utils/Data/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roles")
        .setDescription("Renvoies les règles du serveur !"),
    perms: [config.IDs.roles.admins],
    async execute(client, interaction) {
        const img = new MessageAttachment('Images/Roles.png')
        
        const embed = new MessageEmbed()
            .setAuthor("Autorôles !", interaction.guild.iconURL())
            .setDescription("Afin d'**améliorer ton expérience** sur notre serveur, veille à choisir tes **rôles** ! \n\n Ceux-ci te permettront d'être mentionné.e lors de certaines annonces ! ✨ \n \n Ils te donneront aussi accès à certains salons ainsi, si tu développe en Kotlin tu ne seras pas embêté.e par les salons comme Discord.JS ! <a:Check:845300903095566338> \n \n 💡 Pour retirer un rôle il te suffit de le resélectonner !")
            .setFooter("Système d'autorôle de " + interaction.guild.name, interaction.guild.iconURL())
            .setImage("attachment://Roles.png")
            .setColor(client.config.colors.default);

        const row = new MessageActionRow()
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
                        label: 'Giveaways',
                        emoji: '🎁',
                        value: `${client.config.IDs.roles.giveawaysNotifs}`,
                        description: 'Tu seras mentionné lors de giveaways !'
                    },
                    {
                        label: 'Streams',
                        emoji: '<:twitch:988386344357199882>',
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
                ]),
            ])

    const devRow = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
                .setCustomId('autoroles/2')
                .setPlaceholder('🧬 Choisissez vos rôles !')
                .setMaxValues(8)
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
                        emoji: '<:javascript:988387659808403507>',
                        value: `${client.config.IDs.roles.javascript}`,
                        description: 'Pour les développeurs JavaScript !'
                    },
                    {
                        label: 'Python',
                        emoji: '<:python:988387662073298954>',
                        value: `${client.config.IDs.roles.python}`,
                        description: 'Pour les développeurs Python !'
                    },
                    {
                        label: 'Java/Kotlin',
                        emoji: '<:java:988387658613002281>',
                        value: `${client.config.IDs.roles.java}`,
                        description: 'Pour les développeurs Java/Kotlin !'
                    },
                    {
                        label: 'C/C++',
                        emoji: '<:clanguage:988386532475940874>',
                        value: `${client.config.IDs.roles.c}`,
                        description: 'Pour les développeurs C/C++'
                    },
                    {
                        label: 'C#',
                        emoji: '<:csharp:988387655014285364>',
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

        interaction.channel.send({embeds: [embed], components: [row, devRow], files: [img]})
    },
}