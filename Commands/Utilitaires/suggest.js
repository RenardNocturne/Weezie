const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");
const { writeFile, readFileSync } = require("fs")
const config = require("../../Utils/Data/config.json")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("suggest")
            .setDescription("📮 Envoyez vos suggestions pour le serveur et pour Weezie !")
            .addStringOption(option => option
                .setName("description")
                .setDescription("📝 Décrivez votre suggestion !")
                .setRequired(true)
            ),
    perms: [config.IDs.roles.users],
    async execute(client, interaction) {

        const suggest = interaction.options.getString("description")
        const suggests = JSON.parse(readFileSync('./Utils/Data/suggests.json'));
        const suggestsMap = client.JSONToMap(suggests);
        
        suggestsMap.set(interaction.id, {
            suggest: suggest,

            opt1: 0,
            opt2: 0,
            opt3: 0,
            total: 0,
           
            hasVoted: {},
        }); 

        writeFile("./Utils/Data/suggests.json", client.mapToJSON(suggestsMap), err => {
            if (err) console.error(err)
        });

        const embed = new MessageEmbed()
            .setAuthor(`Suggestion !` , interaction.guild.iconURL())
            .setDescription(`**📝 Contenu:** \n ${suggest}`)
            .setFooter(`Suggestion de ${interaction.member.displayName}`, interaction.member.displayAvatarURL())
            .setColor(client.config.colors.default)
        
        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("Pour !")
                    .setCustomId(`suggestVote/${interaction.id}/1`)
                    .setStyle("SUCCESS"),

                new MessageButton()
                    .setLabel("Neutre")
                    .setCustomId(`suggestVote/${interaction.id}/3`)
                    .setStyle("SECONDARY"),

                new MessageButton()
                    .setLabel("Contre !")
                    .setCustomId(`suggestVote/${interaction.id}/2`)
                    .setStyle("DANGER"),

                new MessageButton()
                    .setLabel("Répondre !")
                    .setCustomId(`endSuggest/${interaction.id}`)
                    .setStyle("PRIMARY")
            ])

        await client.checkIfMemberHasLevelAbove(interaction.member, 70) ?  client.channels.cache.get(client.config.IDs.channels.suggests).send({ content: `Avantages de niveaux: Notification pour <@&${config.IDs.roles.pollsNotifs}> !`, embeds: [embed], components: [row]})
        .then(msg => interaction.reply({content: `✅ [Suggestion](${msg.url}) envoyé !`, ephemeral: true}))
        : client.channels.cache.get(client.config.IDs.channels.suggests).send({ embeds: [embed], components: [row]})
        .then(msg => interaction.reply({content: `✅ [Suggestion](${msg.url}) envoyé !`, ephemeral: true}))
    },
}