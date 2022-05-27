const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @returns 
 */

module.exports = async (client, message) => {
    const pubChannels = client.config.IDs.channels.pubChannels;
    if (!message.interaction && message.webhookId && pubChannels.includes(message.channel.id)) return client.emit('pubSent', message)
    if (message.author.bot && pubChannels.includes(message.channelId) && message.author.id !== client.user.id) return message.delete();
    if (message.author.bot) return;
    
    if (message.interaction?.commandName === "bump") return client.addExp(message.guild.members.cache.get(message.interaction.user.id), client.randomIntFromInterval(7, 15), message.channel); 
    
    if (message.channelId === client.config.IDs.channels.partnerships) client.emit("partnership", message);
    if (pubChannels.includes(message.channel.id)) client.emit("pubSent", message);

    client.addExp(message.member, client.randomIntFromInterval(1, 10), message.channel)
}