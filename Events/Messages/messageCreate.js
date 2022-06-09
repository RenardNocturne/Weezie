const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { bump } = require("../../Utils/Data/messages.json");

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
    
    if (message.interaction?.commandName === "bump") {
        const exp = client.random(7, 15)
        message.channel.send({content: bump[client.random(0, bump.length - 1)] + exp + " points d'expérience !"})    
        return client.addExp(message.guild.members.cache.get(message.interaction.user.id), exp, message.channel); 
    }

    if (message.author.bot) return;
    if (message.channelId === client.config.IDs.channels.partnerships) client.emit("partnership", message);
    if (pubChannels.includes(message.channel.id)) client.emit("pubSent", message);

    client.addExp(message.member, client.random(1, 10), message.channel)
}