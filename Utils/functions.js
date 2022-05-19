const { MessageEmbed } = require("discord.js")

module.exports = client => {
    client.defaultColor = "E7C368"
    client.errorColor = "DE2916"
    client.successColor = "27AE60"
    client.boostColor = "F47FFF"

    client.error = (err, msg) => {
        const embed = new MessageEmbed()
            .setAuthor("Erreur", client.user.displayAvatarURL())
            .setColor(client.errorColor) 
            .setDescription(`${msg ? msg : "❌ Une erreur est survenue !"} ${err ? "\n ```" + err + "```" : ""}`)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        client.channels.cache.get(client.config.IDs.channels.errorLogs).send({embeds: [embed]})
        console.log(`❌ ${msg ? msg : "Une erreur est survenue !"} ${err ? "\n" + err : ""}`)
    }

    client.success = (msg) => {
        const embed = new MessageEmbed()
            .setAuthor("Succès", client.user.displayAvatarURL())
            .setColor(client.successColor)
            .setDescription(msg)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        client.channels.cache.get(client.config.IDs.channels.errorLogs).send({embeds: [embed]})
        console.log(`✅ ${msg}`)
    }

    client.randomIntFromInterval = (min, max) => { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    client.JSONToMap = (json) => {
        const map = new Map()
        for (const [key, value] of Object.entries(json)) {
            map.set(key, value)
        }
        return map
    }

    client.mapToJSON = (map) => {
        const json = {}
        for (const [key, value] of map) {
            json[key] = value
        }
        return JSON.stringify(json)
    }
}