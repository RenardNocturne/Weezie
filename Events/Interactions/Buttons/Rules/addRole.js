const { Client, Interaction, ButtonInteraction } = require("discord.js")

module.exports = {
    name: "addRole",
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     */
    async execute (client, interaction) {
        const args = interaction.customId.split("/").slice(1)
        for (const roleID of args) {
            if (interaction.member.roles.cache.has(roleID)) {
                continue;
            } else {
                interaction.member.roles.add(roleID)
            }
        }
        interaction.update({content: `✅ Vos rôles ont bien été mis à jour !`, components: [], embeds: []})
    }
}