const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, interaction) => {
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
}

module.exports.help = {
    name: "ping",
    userPerms: [],
    userPermsFR: []
}