const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const config = require("../../Utils/Data/config.json")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("kick")
            .setDescription("🔨 Expulse un membre.")
            .addUserOption(option => option
                .setName("membre")
                .setDescription("👤 Choisissez un membre à expulser !")
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("raison")
                .setDescription("📝 Ajouter une raison.")),
    perms: [config.IDs.roles.admins, config.IDs.roles.mods],
    async execute(client, interaction) {
        const target = interaction.options.getMember("membre")
        const reason = "";
        if (interaction.options.getString("raison")) reason = `\n \n *__📝 Raison:__* \n > ${interaction.options.getString("raison")}`

        const embed = new MessageEmbed()
            .setAuthor(`${target.user.tag} expulsé !`, target.user.displayAvatarURL())
            .setDescription(`*__👤 Modérateur:__* \n > <@!${interaction.user.id}> ${reason}`)
            .setColor(client.defaultColor)
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
            .setTimestamp();

        if (!target.kickable) return interaction.reply({content: ":x: Il m'est impossible d'expulser ce membre !", ephemeral: true})
        target.kick({reason: reason});
        interaction.reply({embeds: [embed]})
    },
}