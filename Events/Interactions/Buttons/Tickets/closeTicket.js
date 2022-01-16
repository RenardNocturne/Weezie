const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js")

module.exports =  {
    name: "closeTicket",
    async execute (client, interaction) {
        if (!interaction.member.roles.cache.has("825764558093156372") || !interaction.member.roles.cache.has("825764023504470047")) return interaction.reply({content: "❌ Vous n'avez pas le rôle requis !", ephemeral: true})
        interaction.channel.delete().catch(err => console.log(err))
    }
}
