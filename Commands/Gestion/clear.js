const { Permissions } = require("discord.js")

const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Nettoie un nombre défini de messages dans le salon !')
        .addIntegerOption(option => option.setName("messages").setDescription("Nombre de messages à supprimer").setRequired(true)),
	async execute(client, interaction) {
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
    },
    userPerms: [Permissions.FLAGS.MANAGE_MESSAGES],
    userPermsFR: ["Gérer les messages"]
};