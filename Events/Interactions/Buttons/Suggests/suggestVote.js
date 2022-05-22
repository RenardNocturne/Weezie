const { writeFile, readFileSync } = require("fs");
const { MessageEmbed, Client, ButtonInteraction, Permissions } = require("discord.js");

module.exports = {
    name: "suggestVote",
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @returns 
     */
    async execute (client, interaction) {
        const suggests = JSON.parse(readFileSync('./Utils/Data/suggests.json'));

        const args = interaction.customId.split("/").slice(1);
        const suggestID = args[0];
        const vote = args[1];

        const suggestsMap = client.JSONToMap(suggests);
        const suggest = suggestsMap.get(suggestID);

        if (Object.keys(suggest.hasVoted).includes(interaction.user.id)) return interaction.reply({content: "❌ Vous avez déjà voter !", ephemeral: true})
        
        suggest.hasVoted[interaction.user.id] = vote;
        suggest.total += 1;
        eval(`suggest.opt${vote} += 1;`);

        writeFile("./Utils/Data/suggests.json", client.mapToJSON(suggestsMap), err => {
            if (err) console.error(err)
            console.log("The file was saved!");
        });

        interaction.reply({content: "✅ Vote comptabilisé !", ephemeral: true})

        const newEmbed = new MessageEmbed()
            .setAuthor("Suggestion !", interaction.guild.iconURL())
            .setDescription(`**📝 Contenu:** \n ${suggest.suggest} \n \n ✅ **Approuvée à ${Math.round(suggest.opt1/suggest.total*100)}%** \n \n 🏳 **Neutre à ${Math.round(suggest.opt3/suggest.total*100)}%** \n \n ❌ **Déclinée à ${Math.round(suggest.opt2/suggest.total*100)}%** \n \n *${suggest.total} participants !*`)
            .setColor(client.config.colors.default)
            .setFooter(interaction.message.embeds[0].footer.text, interaction.message.embeds[0].footer.iconURL)

        interaction.message.edit({embeds: [newEmbed]})
        
    }
}