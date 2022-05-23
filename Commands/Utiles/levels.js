const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction } = require("discord.js");
const config = require("../../Utils/Data/config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("levels")
        .setDescription("⭐ Commandes concernant les niveaux !")
        .addSubcommand(command => command
            .setName("get")
            .setDescription("📜 Affiche le rang d'un membre !")
            .addUserOption(option => option
                .setName("membre")
                .setDescription("👤 Choisissez un membre !")
                .setRequired(true)
            )
        )
        .addSubcommand(command => command
            .setName("add")
            .setDescription("🎁 Ajoute de l’expérience à un membre !")
            .addUserOption(option => option
                .setName("membre")
                .setDescription("👤 Choisissez un membre !")
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName("exp")
                .setDescription("🏮 Choisissez l’expérience à ajouter !")
                .setRequired(true)
            )
        )
        .addSubcommand(command => command
            .setName("remove")
            .setDescription("🔥 Retire de l’expérience à un membre !")
            .addUserOption(option => option
                .setName("membre")
                .setDescription("👤 Choisissez un membre !")
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName("exp")
                .setDescription("🏮 Choisissez l’expérience à retirer !")
                .setRequired(true)
            )
        ),
    perms: [config.IDs.roles.users],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        const command = interaction.options.getSubcommand();
        const target = interaction.options.getMember("membre")

        switch (command) {
            case "get":
                if (target.user.bot) return interaction.reply({content: "❌ Cet utilisateur est un robot !", ephemeral: true})
                client.getLevelInfo(target).then(async (info) => {
                    if (!info) info = {exp: 0, level: 0, levelExp: 100}
                    client.sendLevelCard(target, info, info.exp, interaction, `⭐ ${target.user.username} est actuellement au niveau ${info.level} !`);
                })       
                break;
            case "add":
                if (!interaction.member.roles.cache.has(config.IDs.roles.mods)) return interaction.reply({content: `🔒 Vous n'avez pas un des rôles requis: \n > <@&${config.IDs.roles.mods}>`, ephemeral: true})
                const expToAdd = interaction.options.getInteger("exp")
                if (expToAdd <= 0) return interaction.reply({content: "❌ L'expérience doit être supérieure à 0 !", ephemeral: true})
                client.addExp(target, expToAdd, interaction.channel).then(() => interaction.reply({content: `✅ J'ai ajouté avec succès ${expToAdd} expériences à ${target.user.username} !`, ephemeral: true}))
                break;
            case "remove":
                if (!interaction.member.roles.cache.has(config.IDs.roles.mods)) return interaction.reply({content: `🔒 Vous n'avez pas un des rôles requis: \n > <@&${config.IDs.roles.mods}>`, ephemeral: true})
                const expToRemove = interaction.options.getInteger("exp")
                if (expToRemove <= 0) return interaction.reply({content: "❌ L'expérience à retirer doit être supérieure à 0 !", ephemeral: true})
                client.removeExp(target, expToRemove, interaction.channel).then(() => interaction.reply({content: `✅ J'ai supprimé avec succès ${expToRemove} expériences à ${target.user.username} !`, ephemeral: true}))
                break;
            default:
                break;
        }
    }
}