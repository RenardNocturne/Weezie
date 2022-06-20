const { Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../../Utils/Data/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Renvoie l\'embed des tickets !'),
    perms: [config.IDs.roles.admins],
    async execute(client, interaction) {
        const Support = new MessageAttachment("Images/Support.gif")

        const embed = new MessageEmbed()
            .setAuthor('Ouvrir un ticket:', interaction.guild.iconURL())
            .setDescription('**❓ Comment faire ?** \n Pour ouvrir un ticket, il vous suffit de **sélectionner le menu déroulant** ci-dessous. Ainsi, nous pourront répondre au mieux votre demande ! \n \n **✅ Une fois votre ticket abouti:** \n Nous vous informerons que votre demande a bien abouti. Sachez aussi qu\'**aucune donnée** concernant le ticket ne sera **sauvegardée** 🧹 !')
            .setColor(client.config.colors.default)
            .setImage('attachment://Support.gif')
            .setFooter(`Système de ticket du serveur ${interaction.guild.name}`, interaction.channel.guild.iconURL());

        const row = new MessageActionRow()
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

        interaction.channel.send({embeds: [embed],  components: [row], files: [Support]})
    },
};