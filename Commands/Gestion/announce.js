const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const config = require("../../Utils/Data/config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('annonce')
        .setDescription('📢 Envoie une annonce dans le salon d\'annonces !'),
    perms: [config.IDs.roles.admins],
    async execute (client, interaction) {
        const embed = new MessageEmbed()
            .setTitle("📢 Annonce !")
            .setDescription("Contenu de l'annonce !")
            .setColor(client.defaultColor)
            .setFooter(`Annonce de ${interaction.user.username}`, interaction.user.displayAvatarURL())
            .setTimestamp();

        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("❌ Annuler !")
                    .setCustomId(`announce/cancel/${interaction.user.id}`)
                    .setStyle("DANGER"),
                new MessageButton()
                    .setLabel("1️⃣ Titre !")
                    .setCustomId(`announce/title/${interaction.user.id}`)
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("2️⃣ Description !")
                    .setCustomId(`announce/description/${interaction.user.id}`)
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setLabel("🚀 Envoyer !")
                    .setCustomId(`announce/send/${interaction.user.id}`)
                    .setStyle("SUCCESS"),
            ])

        interaction.reply({embeds: [embed], components: [row]})
    }
}