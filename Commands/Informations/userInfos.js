const { MessageEmbed, Client, ContextMenuInteraction } = require("discord.js")
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const config = require("../../Utils/Data/config.json")

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('User Infos')
        .setType(2),
    perms: [config.IDs.roles.users],
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
                { name: '๐ฅ Tag', value: `${user.tag}`, inline: true },
                { name: '๐ ID', value: `${user.id}`, inline: true },
                { name: '๐ Statut', value: `${member.presence.status}`, inline: true },
                { name: '๐ฎ Jeu', value: `${member.presence.activities.join(", ") ? member.presence.activities.join(", ") : 'Aucun'}`, inline: true },
                { name: '๐ Crรฉe le', value: `${user.createdAt.toLocaleString()}`, inline: true },
                { name: '๐ญ Roles', value: `${member.roles.cache.map(r => "<@&" + r.id + ">").join(', ')}`, inline: true },
                { name: '๐ Nombre de roles', value: `${member.roles.cache.size}`, inline: true },
                { name: '๐ค Bot', value: `${user.bot ? "Est un bot !" : "N'est pas un bot !"}`, inline: true },
            ])
            .setColor(client.config.colors.default)
            .setFooter(`Demandรฉe par ${interaction.member.displayName}`, interaction.member.displayAvatarURL())
            .setTimestamp();
        interaction.reply({embeds: [embed], ephemeral: true});
    },
};