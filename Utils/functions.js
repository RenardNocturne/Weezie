const { MessageEmbed } = require("discord.js")

module.exports = client => {
    client.defaultColor = "E7C368"
    client.errorColor = "DE2916"
    client.successColor = "27AE60"
    client.boostColor = "F47FFF"

    // client.embedError = (title = "❌ Une erreur est survenue !", desc = "", footer = "Désolé !") => {
    //     return new MessageEmbed()
    //         .setTitle(title)
    //         .setDescription(desc)
    //         .setColor(client.errorColor)
    //         .setFooter(footer, client.user.displayAvatarURL());
    // }
}