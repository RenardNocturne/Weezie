const { MessageEmbed, Client, Interaction, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "acceptDevRules",
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute (client, interaction) {
        // if (interaction.member.roles.cache.has("922223564835414096")) return interaction.reply({content: `<@!${interaction.user.id}>, tu as déjà accepté les règles ! `, ephemeral: true})
        const askForRoleEmbed = new MessageEmbed()
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
            .setDescription(`Souhaites-tu obtenir le rôle <@&922223564835414096> ou <@&952900970864599100> ?`)
            .setColor(client.defaultColor)
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
        
        const askForRoleComponent = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("addRole/922223564835414096")
                    .setLabel("💻 Développeur !"),

                new MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("addRole/952900970864599100")
                    .setLabel("🎨 Graphiste !"),
                
                new MessageButton()
                    .setStyle("PRIMARY")
                    .setCustomId("addRole/952900970864599100/922223564835414096")
                    .setLabel("🦾 Les deux !")
            ])

        interaction.reply({embeds: [askForRoleEmbed], components: [askForRoleComponent], ephemeral: true})
        // interaction.member.roles.add("922223564835414096");
        // interaction.reply({content: `<@!${interaction.user.id}>, tu as obtenu le rôle <@&922223564835414096> ! Tu peux désormais accepter des annonces ! :tada:`, ephemeral: true})
    }
}