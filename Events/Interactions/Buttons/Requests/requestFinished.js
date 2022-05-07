module.exports = {
    name: "requestFinished",
    async execute (client, interaction) {
        const target = client.guilds.cache.get(client.config.IDs.guilds).members.cache.get(interaction.customId.split("/")[1]);

        interaction.user.id === target.id || interaction.member.roles.cache.has(client.config.IDs.roles.admins) || interaction.member.roles.cache.has(client.config.IDs.roles.mods) ? interaction.channel.delete().catch(err => client.error(err)) 
        : interaction.reply({content: "❌ Vous n'êtes pas à l'origine de cette requête !", ephemeral: true})
    }
}