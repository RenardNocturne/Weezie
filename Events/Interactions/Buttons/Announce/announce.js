const { MessageEmbed, Client, ButtonInteraction, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "announce",
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @returns 
     */
    async execute (client, interaction) {
        const args = interaction.customId.split("/").slice(1);
        if (interaction.user.id !== args[1]) return interaction.reply("❌ Vous n'êtes pas à l'origine de cette commande !");
        const filter = m => m.author.id === args[1];

        function awaitMessage (msg) {
            const embed = new MessageEmbed()
                .setAuthor(interaction.member.displayName, interaction.member.displayAvatarURL())
                .setDescription(msg + "\n\n ``Annulation dans 1 minute !``")
                .setColor(client.config.colors.default)
                .setFooter("Annonce de " + interaction.member.displayName, interaction.member.displayAvatarURL())

            return interaction.channel.send({embeds: [embed]})
        }

        switch (args[0]) {
            case "cancel":
                interaction.reply({content: "❌ Annonce annulée !", ephemeral: true});
                interaction.message.delete().catch(err => null);
                break;
            
            case "title":
                interaction.deferUpdate();
                awaitMessage("Choisissez un titre pour votre annonce !")
                .then(async message => {
                        await interaction.channel.awaitMessages({filter: filter, max: 1, time: 60000, errors: ["time"] }).then(collected => {
                            const msgCollected = collected.first().content
                            collected.first().delete().catch(err => null);
                            message.delete().catch(err => null);
                            const newEmbed = interaction.message.embeds[0]
                            newEmbed.setTitle(msgCollected);
                            interaction.message.edit({embeds: [newEmbed]});
                        })
                        .catch(err => {
                            message.delete().catch(err => null);
                        })
                    })
                break;

            case "description":
                interaction.deferUpdate();
                awaitMessage("Choisissez une description pour votre annonce !")
                .then(async message => {
                        await interaction.channel.awaitMessages({filter: filter, max: 1, time: 60000, errors: ["time"] }).then(collected => {
                            const msgCollected = collected.first().content
                            collected.first().delete().catch(err => null);
                            message.delete().catch(err => null);
                            const newEmbed = interaction.message.embeds[0]
                            newEmbed.setDescription(msgCollected);
                            interaction.message.edit({embeds: [newEmbed]});
                        })
                        .catch(err => {
                            message.delete().catch(err => null);
                        })
                    })
                break;

            case "send":
                client.channels.cache.get(client.config.IDs.channels.announcements).send({content: `Notification pour <@&${client.config.IDs.roles.announcementsNotifs}> !`, embeds: [interaction.message.embeds[0]]}).then(msg => {
                    interaction.reply(`🚀 [Annonce envoyée](${msg.url}) !`);
                    msg.react(msg.guild.emojis.cache.get('988386533310623776')).catch(err => null);
                }) 
                interaction.message.delete().catch(err => null);
                break;
            default:
                break;
        }
    }
}