const { writeFile, readFileSync } = require("fs");
const { MessageEmbed, Client, ButtonInteraction } = require("discord.js");

module.exports = {
    name: "vote",
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @returns 
     */
    async execute (client, interaction) {
        const doubleVote = await client.checkIfMemberHasLevelAbove(interaction.member, 30)

        const polls = JSON.parse(readFileSync('./Utils/Data/polls.json'));

        const args = interaction.customId.split("/").slice(1);
        const pollID = args[0];
        const vote = args[1];
        
        const pollsMap = client.JSONToMap(polls);
        const poll = pollsMap.get(pollID);
        if (poll.hasVoted.includes(interaction.user.id)) return interaction.reply({content: "❌ Vous avez déjà voté !", ephemeral: true});

        poll.hasVoted.push(interaction.user.id);
        if (doubleVote) {
            poll.total += 2;
            eval(`poll.opt${vote} += 2;`);
        } else {
            poll.total += 1;
            eval(`poll.opt${vote} += 1;`);
        }
        
        writeFile("./Utils/Data/polls.json", client.mapToJSON(pollsMap), err => {
            if (err) console.error(err)
            
        });

        const newEmbed = new MessageEmbed()
            .setAuthor("Sondage !", interaction.guild.iconURL())
            .setDescription(`**❓ Question:** ${poll.question} \n \n 1️⃣ **Option 1:** ${poll.option1} \`${Math.round(poll.opt1/poll.total*100)}%\` \n \n 2️⃣ **Option 2:** ${poll.option2} \` ${Math.round(poll.opt2/poll.total*100)}%\` ${poll.option3 ? `\n \n 3️⃣ **Option 3:** ${poll.option3} \`${Math.round(poll.opt3/poll.total*100)}%\`` : ""} \n \n 🏳 **Neutre à ${Math.round(poll.opt0/poll.total*100)}%** \n \n *${poll.total} votes !*`)
            .setColor(client.config.colors.default)
            .setFooter(interaction.message.embeds[0].footer.text, interaction.message.embeds[0].footer.iconURL)

        interaction.message.edit({embeds: [newEmbed]})
    
        interaction.reply({content: doubleVote ? "✅ Votre vote a bien été compté 2 fois !" : "✅ Vote comptabilisé !", ephemeral: true})
    }
}