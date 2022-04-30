const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, MessageAttachment } = require("discord.js");

module.exports = (client, interaction) => {
    async function createTicket (ticketReason, event) {
        await interaction.guild.channels.create(`ticket-de-${interaction.user.username}`, {
            type: 'text',
            topic: `**${interaction.user.username}** a ouvert ce ticket pour la raison **"${ticketReason}"** !`,
            position: 1,
            reason: ticketReason,
            parent: client.config.IDs.categories.tickets,
            permissionOverwrites: [
                {
                    id: interaction.guild.id, //Everyone
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id, //Celui qui a ouvert le ticket
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: client.config.IDs.roles.admins, //Les admins
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: client.config.IDs.roles.mods, //Les modos
                    allow: ['VIEW_CHANNEL']
                },
            ],
        }).then(newChannel => {
            const embed = new MessageEmbed()
                .setAuthor(`Ticket de ${interaction.user.username}`, interaction.user.displayAvatarURL())
                .setDescription(`Ticket ouvert par <@!${interaction.user.id}>: \n \n **📝 Raison:**  \`${ticketReason}\` \n \n *Merci de renseigner votre problème en utilisant le bouton \`Démarrer la procédure !\` ci-dessous !*`)
                .setColor(client.defaultColor)
                .setThumbnail('https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/169842009/original/46a0b436c0aee26427e93e58dcc839a5d5002f9f/give-a-python-ticket-system-for-discord-bot.png')
                .setFooter(`Ticket ouvert par ${interaction.user.username}`, interaction.user.avatarURL())
                .setTimestamp();
            
            const Support = new MessageAttachment("Images/Support.gif")

            const startEmbed = new MessageEmbed()
                .setAuthor('Ouvrir un ticket:', interaction.guild.iconURL())
                .setDescription('**❓ Comment faire ?** \n Pour ouvrir un ticket, il vous suffit de **sélectionner le menu déroulant** ci-dessous. Ainsi, nous pourront répondre au mieux votre demande ! \n \n **✅ Une fois votre ticket abouti:** \n Nous vous informerons que votre demande a bien abouti. Sachez aussi qu\'**aucune donnée** concernant le ticket ne sera **sauvegardée** 🧹 !')
                .setColor(client.defaultColor)
                .setImage('attachment://Support.gif')
                .setFooter(`Système de ticket du serveur ${interaction.guild.name}`, interaction.channel.guild.iconURL());
    
            const startRow = new MessageActionRow()
                .addComponents([
                    new MessageSelectMenu()
                        .setPlaceholder('🎫 Ouvrir un ticket...')
                        .setCustomId('ticket')
                        .addOptions([
                            {
                                label: 'Contact',
                                value: 'contact',
                                emoji: '🏷',
                                description: 'Vous permet de contacter le staff.'
                            },
                            {
                                label: 'Signalement',
                                value: 'report',
                                emoji: '📣',
                                description: 'Afin de faire remonter un problème au staff !'
                            },
                            {
                                label: 'Partenariat',
                                value: 'partnership',
                                emoji: '📮',
                                description: 'Si vous souhaitez proposer un partenariat avec le serveur.'
                            },
                            {
                                label: 'Autre',
                                value: 'other',
                                emoji: '📚',
                                description: 'Pour toute autre demande.'
                            },
                        ])
                ]);

            const row = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setLabel('Fermer le ticket !')
                        .setStyle('DANGER')
                        .setCustomId('closeTicket'),
                        
                    new MessageButton()
                        .setCustomId(`${event}`)
                        .setLabel("Démarrer la procédure !")
                        .setStyle("SUCCESS")
                ])


            interaction.message.edit({embeds: [startEmbed], components: [startRow]});
            interaction.reply({content: `Votre ticket <#${newChannel.id}> a bien été créé !`, ephemeral: true})
            client.channels.cache.find(channel => channel.id === newChannel.id).send({embeds: [embed], components: [row]})
            .then(msg => {
                msg.pin()
            })
        })
    }

    switch (interaction.values[0]) {
        case 'contact':
            createTicket('Contacter le staff', 'basic')
            break;
        case "report":
            createTicket("Signalement", 'report')
            break;
        case "partnership":
            createTicket("Partenariat", 'partnership')
            break;
        case "other":
            createTicket("Autre", 'basic')
            break;
        default:
            break;
    }
}