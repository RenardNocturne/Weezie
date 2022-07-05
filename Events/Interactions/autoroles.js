const { MessageAttachment, MessageEmbed, MessageActionRow, MessageSelectMenu, Client, SelectMenuInteraction } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {SelectMenuInteraction} interaction 
 */
module.exports = (client, interaction) => {
    const type = interaction.customId.split("/")[1]

    const roles = {
        newRoles: [],
        removedRoles: []
    }

    interaction.values.forEach(value => {
        if (!interaction.member.roles.cache.has(value)) {
            roles.newRoles.push(value)
            interaction.member.roles.add(value)
        } else {
            roles.removedRoles.push(value)
            interaction.member.roles.remove(value)
        }
    })

    interaction.reply({content: `${roles.newRoles.length > 0 ? `✨ Roles ajoutés: <@&${roles.newRoles.join(">, <@&")}> !` : ''} ${roles.removedRoles.length > 0 ? `\n\n 🧨 Roles retirés: <@&${roles.removedRoles.join(">, <@&")}> !` : ''}`, ephemeral: true});
    console.log(interaction.message.embeds[0].image);
    const embed = type === "3" ? interaction.message.embeds[0].setImage("attachment://DevRules.gif") : interaction.message.embeds[0].setImage("attachment://Roles.png")

    interaction.message.edit({embeds: [embed], components: interaction.message.components, files: []})
}
