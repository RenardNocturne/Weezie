const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, MessageEmbed, MessageActionRow, MessageButton, Client, Interaction } = require("discord.js");
const { writeFile, readFileSync } = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("poll")
            .setDescription("📊 Vous permet de créer des sondages !")
            .addStringOption(option => option
                .setName("question")
                .setDescription("📝 Décrivez la question.")
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("option1")
                .setDescription("1️⃣ Ajoutez une possibilité.")
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("option2")
                .setDescription("2️⃣ Ajoutez une possibilité.")
                .setRequired(true)
            ),
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    async execute(client, interaction) {
        const polls = JSON.parse(readFileSync('./Utils/Data/polls.json'));

        const question = interaction.options.getString("question")
        const opt1 = interaction.options.getString("option1")
        const opt2 = interaction.options.getString("option2")  

        const pollsMap = client.JSONToMap(polls);
        
        pollsMap.set(interaction.id, {
            question: question,
            option1: opt1,
            option2: opt2,
            
            opt0: 0,
            opt1: 0,
            opt2: 0,
            total: 0,
           
            hasVoted: [],
        }); 

        writeFile("./Utils/Data/polls.json", client.mapToJSON(pollsMap), err => {
            if (err) console.error(err)
            console.log("The file was saved!");
        });

        const embed = new MessageEmbed()
            .setAuthor("Sondage !", interaction.guild.iconURL())
            .setDescription(`**❓ Question:** ${question} \n \n 1️⃣ **Option 1:** ${opt1} \n \n 2️⃣ **Option 2:** ${opt2}`)
            .setColor(client.defaultColor)
            .setFooter(`Sondage de ${interaction.user.username}`, interaction.user.displayAvatarURL())

        const row = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("Option 1")
                    .setCustomId(`vote/${interaction.id}/1`)
                    .setStyle("PRIMARY"),

                new MessageButton()
                    .setLabel("Neutre")
                    .setCustomId(`vote/${interaction.id}/0`)
                    .setStyle("SECONDARY"),

                new MessageButton()
                    .setLabel("Option 2")
                    .setCustomId(`vote/${interaction.id}/2`)
                    .setStyle("PRIMARY"),

                new MessageButton()
                    .setLabel("Terminer !")
                    .setCustomId(`endPoll/${interaction.id}`)
                    .setStyle("DANGER")
            ])

        client.channels.cache.get(client.config.IDs.channels.polls).send({content: `Notification pour <@&${client.config.IDs.roles.pollsNotifs}> !`, embeds: [embed], components: [row]})
        .then(msg => interaction.reply({content: `✅ [Sondage](${msg.url}) envoyé !`, ephemeral: true}))
    },  
    userPerms: [Permissions.FLAGS.MANAGE_CHANNELS],
    userPermsFR: ["Gérer les salons"]
}