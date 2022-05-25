const { Client, Message } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */
module.exports = async (client, message) => {
    if (message.author.bot) return;

    const guild = message.guild;

    if (message.interaction?.commandName === "bump") return client.addExp(guild.members.cache.get(message.interaction.user.id), client.randomIntFromInterval(7, 15), message.channel); 
    client.addExp(message.member, client.randomIntFromInterval(1, 10), message.channel)
}