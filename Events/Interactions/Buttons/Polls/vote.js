const { writeFile, readFileSync } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "vote",
    async execute (client, interaction) {
        const polls = JSON.parse(readFileSync('./Utils/Data/polls.json'));

        const args = interaction.customId.split("/").slice(1);
        const pollID = args[0];
        const vote = args[1];
        
        console.log(polls);
        const pollsMap = client.JSONToMap(polls);
        const poll = pollsMap.get(pollID);
        console.log(args);
        console.log(pollsMap, poll, pollID);
        if (poll.hasVoted.includes(interaction.user.id)) return interaction.reply({content: "❌ Vous avez déjà voté !", ephemeral: true});

        poll.hasVoted.push(interaction.user.id);
        poll.total += 1;
        eval(`poll.opt${vote} += 1;`);
        
        writeFile("./Utils/Data/polls.json", client.mapToJSON(pollsMap), err => {
            if (err) console.error(err)
            console.log("The file was saved!");
        });


        const newEmbed = new MessageEmbed()
            .setAuthor("Sondage !", interaction.guild.iconURL())
            .setDescription(`**❓ Question:** ${poll.question} \n \n 1️⃣ **Option 1:** ${poll.option1} \`${Math.round(poll.opt1/poll.total*100)}%\` \n \n 🏳 **Neutre à ${Math.round(poll.opt0/poll.total*100)}%** \n \n 2️⃣ **Option 2:** ${poll.option2} \`${Math.round(poll.opt2/poll.total*100)}%\` \n \n *${poll.total} participants !*`)
            .setColor(client.defaultColor)
            .setFooter(`Sondage de ${interaction.user.username}`, interaction.user.displayAvatarURL())

        interaction.message.edit({embeds: [newEmbed]})
    
        interaction.reply({content: "✅ Votre vote a bien été pris en compte.", ephemeral: true});
    }
}