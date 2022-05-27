const { writeFile, readFileSync } = require("fs");
const { MessageEmbed, Client, ButtonInteraction } = require("discord.js");

module.exports = {
    name: "giveaway",
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @returns 
     */
    async execute (client, interaction) {
        const doubleVote = await client.checkIfMemberHasLevelAbove(interaction.member, 90)

        const giveaways = JSON.parse(readFileSync('./Utils/Data/giveaways.json'));

        const args = interaction.customId.split("/").slice(1);
        const giveawayID = args[0];
        
        const giveawaysMap = client.JSONToMap(giveaways);
        const giveaway = giveawaysMap.get(giveawayID);
        if (giveaway.hasVoted.includes(interaction.user.id)) return interaction.reply({content: "❌ Vous êtes déjà participant !", ephemeral: true});
        
        if (doubleVote) {
            giveaway.hasVoted.push(interaction.user.id);
            giveaway.hasVoted.push(interaction.user.id);
        } else {
            giveaway.hasVoted.push(interaction.user.id);
        }
        giveaway.total += 1;

        
        writeFile("./Utils/Data/giveaways.json", client.mapToJSON(giveawaysMap), err => {
            if (err) console.error(err)
            
        });

        const newEmbed = new MessageEmbed()
            .setAuthor(`Nouveau giveaway !`, interaction.guild.iconURL())
            .setDescription(interaction.message.embeds[0].description)
            .setColor(client.config.colors.default)
            .setFooter(giveaway.total + " participants !", interaction.message.embeds[0].footer.iconURL)

        interaction.message.edit({embeds: [newEmbed]})
    
        interaction.reply({content: doubleVote ? "✅ Participation comptabilisée 2 fois !" : "✅ Participation comptabilisée !", ephemeral: true})
    }
}