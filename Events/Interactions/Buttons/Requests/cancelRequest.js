module.exports = {
    name: "cancelRequest",
    async execute (client, interaction) {
        const target = client.guilds.cache.get(client.config.IDs.guilds).members.cache.get(interaction.customId.split("/")[1]);

        interaction.user.id === target?.id || interaction.member.roles.cache.has(client.config.IDs.roles.mods) || interaction.member.roles.cache.has(client.config.IDs.roles.admins) ? interaction.message.delete().catch(err => console.log(err)) 
        : interaction.reply({content: "❌ Vous n'êtes pas à l'origine de cette requête !", ephemeral: true})
        //Si c'est pas l'auteur de la requête, un modo ou un admin on return 
    }
}