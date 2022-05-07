const { MessageEmbed, Client, ContextMenuInteraction } = require("discord.js")
const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('User Infos')
        .setType(2),
    /**
     * 
     * @param {Client} client 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(client, interaction) {
        const user = client.users.cache.get(interaction.targetId)
        const member = client.guilds.cache.get(client.config.IDs.guild).members.cache.get(user.id);
        const embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL())
            .addFields([
                { name: '💥 Tag', value: `${user.tag}`, inline: true },
                { name: '🆔 ID', value: `${user.id}`, inline: true },
                { name: '🎞 Statut', value: `${member.presence.status}`, inline: true },
                { name: '🎮 Jeu', value: `${member.presence.activities.join(", ") ? member.presence.activities.join(", ") : 'Aucun'}`, inline: true },
                { name: '🎂 Crée le', value: `${user.createdAt.toLocaleString()}`, inline: true },
                { name: '🎭 Roles', value: `${member.roles.cache.map(r => "<@&" + r.id + ">").join(', ')}`, inline: true },
                { name: '🎈 Nombre de roles', value: `${member.roles.cache.size}`, inline: true },
                { name: '🤖 Bot', value: `${user.bot ? "Est un bot !" : "N'est pas un bot !"}`, inline: true },
            ])
            .setColor(client.defaultColor)
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
            .setTimestamp();
        interaction.reply({embeds: [embed], ephemeral: true});
    },
    userPerms: [],
    userPermsFR: []
};