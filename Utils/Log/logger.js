module.exports = (client) => {
    client.error = (err, msg) => {
        const embed = new MessageEmbed()
            .setAuthor("Erreur", client.user.displayAvatarURL())
            .setColor(client.errorColor) 
            .setDescription(`${msg ? msg : "❌ Une erreur est survenue !"} ${err ? "\n ```" + err + "```" : ""}`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        client.channels.cache.get(client.config.IDs.channels.errorLogs).send({embeds: [embed]})
        console.log(`${msg ? msg : "❌ Une erreur est survenue !"} ${err ? "\n" + err : ""}`)
    }

    client.success = (msg) => {
        const embed = new MessageEmbed()
            .setAuthor("Succès", client.user.displayAvatarURL())
            .setColor(client.successColor)
            .setDescription(msg)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        client.channels.cache.get(client.config.IDs.channels.errorLogs).send({embeds: [embed]})
        console.log(msg)
    }
}