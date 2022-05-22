const { writeFile, readFileSync } = require("fs");
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: "endPoll",
    async execute (client, interaction) {
        const polls = JSON.parse(readFileSync('./Utils/Data/polls.json'));
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return  interaction.reply({content: "❌ Vous n'avez pas la permission requise !", ephemeral: true})
        
        const pollID = interaction.customId.split("/").slice(1)[0];
        const pollsMap = client.JSONToMap(polls);
        const poll = pollsMap.get(pollID);
        
        const newEmbed = new MessageEmbed()
            .setAuthor("Sondage !", interaction.guild.iconURL())
            .setDescription(`**❓ Question:** ${poll.question} \n \n 1️⃣ **Option 1:** ${poll.option1} \`${Math.round(poll.opt1/poll.total*100)}%\` \n \n 2️⃣ **Option 2:** ${poll.option2} \` ${Math.round(poll.opt2/poll.total*100)}%\` ${poll.option3 ? `\n \n 3️⃣ **Option 3:** ${poll.option3} \`${Math.round(poll.opt3/poll.total*100)}%\`` : ""} \n \n 🏳 **Neutre à ${Math.round(poll.opt0/poll.total*100)}%** \n \n *${poll.total} participants !*`)
            .setColor(client.config.colors.success)
            .setFooter(`Sondage terminé par ${interaction.user.username}`, interaction.user.displayAvatarURL())

        interaction.update({embeds: [newEmbed], components: []})

        pollsMap.delete(pollID);
        writeFile("./Utils/Data/polls.json", client.mapToJSON(pollsMap), err => {
            if (err) console.error(err)
            console.log("The file was saved!");
        });
    }
}