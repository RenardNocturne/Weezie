const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");
const { writeFile, readFileSync } = require("fs")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("suggest")
            .setDescription("📮 Envoyez vos suggestions pour le serveur et pour Weezie !")
            .addStringOption(option => option
                .setName("description")
                .setDescription("📝 Décrivez votre suggestion !")
                .setRequired(true)
            ),
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
            console.log("The file was saved!");
        });

        const embed = new MessageEmbed()
            .setAuthor(`Suggestion !` , interaction.guild.iconURL())
            .setDescription(`**📝 Contenu:** \n ${suggest}`)
            .setFooter(`Suggestion de ${interaction.user.username}`, interaction.user.displayAvatarURL())
            .setColor(client.defaultColor)
        
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

        client.channels.cache.get(client.config.IDs.channels.suggests).send({embeds: [embed], components: [row]})
        .then(msg => interaction.reply({content: `✅ [Suggestion](${msg.url}) envoyé !`, ephemeral: true}))
    },
    userPerms: [],
    userPermsFR: []
}