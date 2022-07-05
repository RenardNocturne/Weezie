const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed, Client, CommandInteraction } = require("discord.js");
const config = require("../../Utils/Data/config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('🔨 Créez votre propre embed !')
        .addStringOption(option => option
            .setName('titre')
            .setDescription("📌 Titre de l'embed.")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('description')
            .setDescription("📜 Description de l'embed.")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('couleur')
            .setDescription("🎀 Couleur de l'embed au format hexadécimal.")
            .setRequired(false)
        )
        .addChannelOption(option => option
            .setName('salon')
            .setDescription("📌 Salon où envoyer l'embed.")
            .setRequired(false)
        ),
    perms: [config.IDs.roles.users],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
    async execute (client, interaction) {
        
        const canUse = await client.checkIfMemberHasLevelAbove(interaction.member, 40)
        if (!canUse) return interaction.reply({content: `❌ Vous n'avez le rôle <@&${config.IDs.roles.allLevels[3]}> !`, ephemeral: true})

        const title = interaction.options.getString("titre");
        const description = interaction.options.getString("description");
        const color = interaction.options.getString("couleur") ?  interaction.options.getString("couleur") : config.colors.default;
        const channel = interaction.options.getChannel("salon") ? interaction.options.getChannel("salon") : interaction.channel;

        if (!channel.isText()) return interaction.reply({content: "❌ Ce salon n'est pas un salon textuel !", ephemeral: true});
        if (!client.isHex(color)) return interaction.reply({content: "❌ La couleur doit être au format hexadécimal !", ephemeral: true});

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setFooter(`Embed de ${interaction.member.displayName}`, interaction.member.displayAvatarURL())
            .setTimestamp();

        channel.createWebhook(interaction.member.displayName, {
            avatar: interaction.member.displayAvatarURL(),
        })
        .then(async hook => {
            await hook.send({embeds: [embed]})
            .then(() => {
                hook.delete()
                interaction.reply({content: "✅ L'embed a bien été envoyé !", ephemeral: true})
            })
        })
    

    }
}