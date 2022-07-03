const { Client, Message } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
    if (!message.member.roles.has(client.config.IDs.roles.partnershipTicket)) return
    message.channel.send(`Notification pour <@&${client.config.IDs.roles.partenairesNotifs}> !`)
    message.member.roles.remove(client.config.IDs.roles.partnershipTicket)
}