const { Permissions } = require("discord.js")
const config = require("../../Utils/Data/config.json")
const { MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('🧹 Nettoie un nombre défini de messages dans le salon !')
        .addSubcommand(messages => messages
            .setName("messages")
            .setDescription("🧹 Supprime un nombre défini de messages dans le salon actuel.")
            .addIntegerOption(option => option
                .setName("nombre")
                .setDescription("📌 Nombre de messages à supprimer compris entre 1 et 99.")
                .setRequired(true))
        )
        .addSubcommand(channel => channel
            .setName("channel")
            .setDescription("🔥 Supprime tous les messages de ce salon.")
        ),
    perms: [config.IDs.roles.admins, config.IDs.roles.mods],
	async execute(client, interaction) {
        switch (interaction.options.getSubcommand()) {
            case "channel":
                if (!interaction.channel.isThread()) interaction.channel.clone()
                .then(newChannel => {
                    newChannel.setPosition(interaction.channel.position)
                    .then(() => {
                        interaction.channel.delete()
                        newChannel.send({content: ':fire: ``Salon réinitialisé !``'})
                        .then(m => setTimeout(() => {
                            m.delete().catch(err => client.error(err))
                        }, 10000))
                    })
                })
                break;
            case "messages":
                const messagesToDelete = interaction.options.getInteger("nombre")

                if (1 >= messagesToDelete || messagesToDelete >= 100) return interaction.reply({content: ':x: Merci de fournir une valeur comprise entre 2 et 99 !', ephemeral: true});

                interaction.channel.bulkDelete(messagesToDelete, true)
                .then(async messagesDeleted => {
                    if (messagesDeleted.size === 0) return interaction.reply({content: ':x: Impossible de supprimer des messages qui datent de plus de deux semaines !', ephemeral: true})

                    await interaction.reply({content: `:fire: \`${messagesDeleted.size} ${messagesDeleted.size > 1 ? 'messages ont été supprimés' : 'message a été supprimé'} !\``})
                    .then(() => setTimeout(() => {
                        interaction.deleteReply().catch(err => client.error(err))
                    }, 1000))
                })
                break; 
        }
    },
};