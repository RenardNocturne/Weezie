module.exports.run = (client, interaction) => {
    const messagesToDelete = interaction.options.data[0].value

    if (0 >= messagesToDelete || messagesToDelete >= 100) return interaction.reply({content: ':x: Merci de fournir une valeur comprise entre 1 et 99 !', ephemeral: true});

    interaction.channel.bulkDelete(messagesToDelete, true)
    .then(async messagesDeleted => {
        if (messagesDeleted.size === 0) return interaction.reply({content: ':x: Impossible de supprimer des messages qui datent de plus de deux semaines !', ephemeral: true})

        await interaction.reply({content: `:fire: \`${messagesDeleted.size} ${messagesDeleted.size > 1 ? 'messages ont été supprimés' : 'message a été supprimé'} !\``})
        .then(() => setTimeout(() => {
            interaction.deleteReply().catch(err => console.log(err))
        }, 1000))
    })
}

module.exports.help = {
    name: "clear"
}