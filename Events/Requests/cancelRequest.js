module.exports = async (client, interaction) => {
    const target = client.guilds.cache.get("825760704241991752").members.cache.get(interaction.customId.split("/")[1]);

    interaction.user.id === target?.id || interaction.member.roles.cache.has("825764558093156372") || interaction.member.roles.cache.has("825764023504470047") ? interaction.message.delete().catch(err => console.log(err)) 
    : interaction.reply({content: "❌ Vous n'êtes pas à l'origine de cette requête !", ephemeral: true})
    //Si c'est pas l'auteur de la requête, un modo ou un admin on return 
}