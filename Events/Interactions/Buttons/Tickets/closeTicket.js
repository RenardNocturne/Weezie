const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js")

module.exports =  {
    name: "closeTicket",
    async execute (client, interaction) {
        interaction.channel.delete().catch(err => client.error(err))
    }
}
