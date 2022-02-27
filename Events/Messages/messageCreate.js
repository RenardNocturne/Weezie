const { Client, Message } = require("discord.js")
const messagesContent = require("../../Utils/messages.json")
 
 /**
  * @param {Client} client 
  * @param {Message} message 
  */
module.exports = (client, message) => {
    if (message.content.startsWith("!d bump")) {
        const messageFilter = m => m.author.id === "302050872383242240"
        message.channel.awaitMessages({filter: messageFilter, max: 1})
        .then(msg => {
            if (msg.first().embeds[0].color === 15420513) return
            message.reply({content: messagesContent.bumpMessages[client.randomIntFromInterval(0, messagesContent.bumpMessages.length)], allowedMentions: {repliedUser: false}});
        })
    }
}