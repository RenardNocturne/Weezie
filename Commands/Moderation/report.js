const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("📣 Vous permet de signaler un membre aux <@&825764023504470047> !")
        .addUserOption(option => option
            .setName("membre")
            .setDescription("👤 Ciblez un membre à reporter !")
            .setRequired(true)
        )
        .addStringOption(option => option 
            .setName("raison")
            .setDescription("📝 Indiquez une raison !")
            .setRequired(true)
        ),
    async execute(client, interaction) {
        const target = interaction.options.getMember("membre");
        const reason = `\n **📝 Raison spécifiée:** \n > ${interaction.options.getString("raison")}`

        interaction.reply({content: "✅ Signalement envoyé !", ephemeral: true, fetchReply: true})
            .then(msg => {
                const embed = new MessageEmbed()
                    .setAuthor(`Signalement en provenance de ${interaction.user.tag} !`, interaction.user.displayAvatarURL())
                    .setDescription(`**👤 Membre ciblé:** \`${target.user.tag}\` \n ${reason} \n \n **📣 Salon d'origine:** <#${interaction.channelId}> \n \n [Sauter vers la commande !](${msg.url})`)
                    .setColor(client.errorColor)
                    .setFooter(`Signalement à l'encontre de ${target.user.tag}`, target.user.displayAvatarURL())
                    .setTimestamp()
                
                client.channels.cache.get("931252719698726973").send({embeds: [embed]})
            })
    },
}