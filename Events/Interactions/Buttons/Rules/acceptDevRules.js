module.exports = {
    name: "acceptDevRules",
    async execute (client, interaction) {
        if (interaction.member.roles.cache.has("922223564835414096")) return interaction.reply({content: `<@!${interaction.user.id}>, tu as déjà accepté les règles ! `, ephemeral: true})

        interaction.member.roles.add("922223564835414096");
        interaction.reply({content: `<@!${interaction.user.id}>, tu as obtenu le rôle <@&922223564835414096> ! Tu peux désormais accepter des annonces ! :tada:`, ephemeral: true})
    }
}