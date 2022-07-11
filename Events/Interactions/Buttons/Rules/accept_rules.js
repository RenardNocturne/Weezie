const { MessageEmbed, MessageActionRow, MessageButton, Client, CommandInteraction } = require('discord.js')

module.exports = {
    name: "accept_rules",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @returns 
     */
    async execute (client, interaction) {
        if (interaction.member.roles.cache.get(client.config.IDs.roles.users)) return interaction.reply({content: `<@!${interaction.user.id}>, tu as déjà accepté les règles ! `, ephemeral: true})
        
        interaction.member.roles.add(client.config.IDs.roles.users).catch(err => client.error(err))
        interaction.reply({content: `Bienvenue ${interaction.user.tag} ! :tada:`, ephemeral: true})
        
        const welcomeEmbed = new MessageEmbed()
            .setAuthor(`${interaction.user.tag} nous a rejoint !`, interaction.member.displayAvatarURL())
            .setDescription(`➜ 👤 Compte créé <t:${Math.round(interaction.user.createdAt/1000)}:R> \n ➜ 🎈 Nous sommes désormais ${interaction.guild.memberCount} membres \n ➜ 🧬 N'oublies pas de choisir tes rôles dans <#${client.config.IDs.channels.autoroles}>`)
            .setColor(client.config.colors.default)

        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setStyle('SUCCESS')
                    .setCustomId(`sayHelloTo/${interaction.member.id}`)
                    .setLabel("👋 Bienvenue !")
            ])
        client.channels.cache.get(client.config.IDs.channels.welcome).send({content: `:tada: Bienvenue <@!${interaction.member.id}> !`, embeds: [welcomeEmbed]/*, components: [row]*/}).then(msg => {
            msg.react("996098313201909930")
        })
    }
}