const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Réponds avec Pong !'),
	async execute(client, interaction) {
        const embed = new MessageEmbed()
            .setTitle("🏓 Pong !")
            .addFields([
                {
                    name: "Ma latence",
                    value: `${Date.now() - interaction.createdTimestamp}ms`,
                },
                {
                    name: "Latence de l'API",
                    value: `${Math.round(client.ws.ping)}ms`,
                }
            ])
            .setColor(client.defaultColor)
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
            .setTimestamp();
        interaction.reply({embeds: [embed], ephemeral: true});
    },
    userPerms: [],
    userPermsFR: []
};