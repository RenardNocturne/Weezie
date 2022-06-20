const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const config = require('../../Utils/Data/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("askhelp")
        .setDescription("Permet de renvoyer l'embed d'assistance !"),
    perms: [config.IDs.roles.admins],
    async execute(client, interaction) {
        const Help = new MessageAttachment("Images/Help.gif")
        
        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("🧬 Choisissez vos rôles !")
                    .setStyle("LINK")
                    .setURL("https://canary.discord.com/channels/988175061074710588/988175062010048554"),
                new MessageButton()
                    .setLabel("💻 Recrutez des développeurs !")
                    .setStyle("LINK")
                    .setURL("https://canary.discord.com/channels/988175061074710588/988175062223953987"),
            ])

        const embed = new MessageEmbed()
            .setAuthor("Demander de l'aide ?", interaction.guild.iconURL())
            .setDescription("❓ **Comment utiliser les salons d'aide ?** \n Pour avoir accès aux salons d'aide, il vous faudra choisir vos rôles dans le salon <#988175062010048554> afin d'obtenir l'accès aux salons concernés par vôtre.vos langage.s de programmation, une fois ceci fait, pensez à rester **polis** et à formuler vos questions **précisément** ! \n \n 💼 **Et pour mes projets ?** \n Si vôtre but est de **recruter un <@&988175061116649473>** afin de vous aider dans vos projets, utilisez plutôt le salon <#988175062223953989> et la commande ``/request`` de <@!922239762797068299> ! Vous n'aurez plus qu'à **attendre** que quelqu'un réponde à votre appel et vous serez automatiquement **mentionné.e** lorsque ce sera fait ! \n \n 🔨 **Des sanctions ?** \n Eh bien... **Oui** ! Demander de l'aide ailleurs que dans les salons dédiés vous sera passible d'un ou plusieurs **avertissement.s** jusqu'à une **expulsion** au même titre que de faire du recrutement ailleurs que dans <#988175062223953989>.")
            .setColor(client.config.colors.default)
            .setImage("attachment://Help.gif")
            .setFooter(`Système d'embeds de ${interaction.guild.name}`, interaction.guild.iconURL())

        interaction.channel.send({embeds: [embed], components: [row], files: [Help]})
    },
}