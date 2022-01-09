const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("roles")
            .setDescription("Renvoies les règles du serveur !"),
    async  execute(client, interaction) {
        const img = new MessageAttachment('Images/Roles.png')
        
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

        interaction.channel.send({embeds: [embed], components: [notifsRow, rolesRow], files: [img]})
    },
}