const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js")

module.exports =  {
    name: "closeTicket",
    async execute (client, interaction) {
        if (!interaction.member.roles.cache.has(client.config.IDs.roles.admins) || !interaction.member.roles.cache.has(client.config.IDs.roles.mods)) return interaction.reply({content: "❌ Vous n'avez pas le rôle requis !", ephemeral: true})
        interaction.channel.delete().catch(err => client.error(err))
    }
}
