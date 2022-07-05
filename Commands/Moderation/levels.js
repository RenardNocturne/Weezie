const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
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
                .setRequired(false)
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
            .addStringOption(option => option
                .setName("reason")
                .setDescription("📝 Choisissez la raison de cette ajout d’expérience !")
                .setRequired(false)
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
            .addStringOption(option => option
                .setName("reason")
                .setDescription("📝 Choisissez la raison de cette ajout d’expérience !")
                .setRequired(false)
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
        const target = interaction.options.getMember("membre") ? interaction.options.getMember("membre") : interaction.member;
        if (target.user.bot) return interaction.reply({content: "❌ Cet utilisateur est un robot !", ephemeral: true})

        switch (command) {
            case "get":
                client.getLevelInfo(target).then(async (info) => {
                    if (!info) info = {exp: 0, level: 0, levelExp: 100}
                    client.sendLevelCard(target, info, info.exp, interaction, `⭐ ${target.user.username} est actuellement au niveau ${info.level} !`);
                })       
                break;
            case "add":
                if (!interaction.member.roles.cache.has(config.IDs.roles.mods)) return interaction.reply({content: `🔒 Vous n'avez pas un des rôles requis: \n > <@&${config.IDs.roles.mods}>`, ephemeral: true})
                const expToAdd = interaction.options.getInteger("exp")
                const reasonAdd = interaction.options.getString("reason")
                if (expToAdd <= 0) return interaction.reply({content: "❌ L'expérience doit être supérieure à 0 !", ephemeral: true})

                const addEmbed = new MessageEmbed()
                    .setAuthor(`${target.user.tag}`, target.user.displayAvatarURL())
                    .setDescription(`${target.user.username} s'est vu ajouté de l'expérience ! \n\n**👤 Membre:** <@!${target.id}> / \`${target.user.tag}\` \n \n **🏷 Quantité ajoutée:** ${expToAdd} \n \n **🔨 Modérateur:** <@!${interaction.member.id}> / \`${interaction.member.user.tag}\` ${reasonAdd ? `\n \n 📝 Raison: ${reasonAdd}` : ""}`)
                    .setColor(client.config.colors.success)
                    .setFooter(`Demandée par ${interaction.member.displayName}`, interaction.member.displayAvatarURL())
                client.addExp(target, expToAdd, interaction.channel).then(() => interaction.reply({embeds: [addEmbed]}))

                break;
            case "remove":
                if (!interaction.member.roles.cache.has(config.IDs.roles.mods)) return interaction.reply({content: `🔒 Vous n'avez pas un des rôles requis: \n > <@&${config.IDs.roles.mods}>`, ephemeral: true})
                const expToRemove = interaction.options.getInteger("exp")
                const reasonRemove = interaction.options.getString("reason")
                if (expToRemove <= 0) return interaction.reply({content: "❌ L'expérience à retirer doit être supérieure à 0 !", ephemeral: true})

                const removeEmbed = new MessageEmbed()
                    .setAuthor(`${target.user.tag}`, target.user.displayAvatarURL())
                    .setDescription(`${target.user.username} s'est vu retiré de l'expérience ! \n\n**👤 Membre:** <@!${target.id}> / \`${target.user.tag}\` \n \n **🔥 Quantité retirée:** ${expToRemove} \n \n **🔨 Modérateur:** <@!${interaction.member.id}> / \`${interaction.member.user.tag}\` ${reasonRemove ? `\n \n 📝 Raison: ${reasonRemove}` : ""}`)
                    .setColor(client.config.colors.error)
                    .setFooter(`Demandée par ${interaction.member.displayName}`, interaction.member.displayAvatarURL())

                client.removeExp(target, expToRemove, interaction.channel).then(() => interaction.reply({embeds: [removeEmbed]}))
                break;
            default:
                break;
        }
    }
}