module.exports = {
    name: "cancelRequestCommand",
    async execute (client, interaction) {
        const target = client.guilds.cache.get(client.config.IDs.guild).members.cache.get(interaction.customId.split("/")[1]);

        interaction.user.id === target?.id ? interaction.message.delete().catch(err => client.error(err)) : interaction.reply({content: "❌ Vous n'êtes pas à l'origine de cette requête !", ephemeral: true})
        //Si c'est pas l'auteur de la requête on return 
    }
}