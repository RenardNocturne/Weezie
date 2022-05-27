const { writeFile, readFileSync } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = (client, interaction, time, msg) => {
    client.setDaysTimeout(() => {
        const embed = msg.embeds[0];

        const giveaways = JSON.parse(readFileSync('./Utils/Data/giveaways.json'));
        
        const giveawayID = interaction.id
        const giveawaysMap = client.JSONToMap(giveaways);
        const giveaway = giveawaysMap.get(giveawayID);
        const winners = [];

        if (giveaway.total < giveaway.winner) {
            const errorEmbed = new MessageEmbed()
                .setAuthor("Giveaway annulé !", interaction.guild.iconURL())
                .setDescription(embed.description + "\n\n❌ Il n'y a pas eu assez de participants pour pouvoir lancer le giveaway !\n\n*" + giveaway.total + " participants !*")
                .setColor(client.config.colors.error)
                .setFooter(embed.footer.text, embed.footer.iconURL);
            return msg.edit({embeds: [errorEmbed], components: []})
        }

        while (winners.length != giveaway.winner && giveaway.hasVoted.length > 0 ) {
            const newWinner = giveaway.hasVoted[client.randomIntFromInterval(0, giveaway.hasVoted.length - 1)];
            winners.push(newWinner);
            giveaway.hasVoted = giveaway.hasVoted.filter(user => user !== newWinner);
        }

        const newEmbed = new MessageEmbed()
            .setAuthor("Giveaway fini !", interaction.guild.iconURL())
            .setDescription(`⏳ Fini ! \n\n 👤 Gagnants: <@${winners.join(">, <@")}> \n\n 🎁 Récompense: \`${giveaway.price}\` \n\n *${giveaway.total} participants !*`)
            .setColor(client.config.colors.success)
            .setTimestamp()
            .setFooter(`Giveaway achevé automatiquement !`, interaction.guild.iconURL())

        msg.edit({embeds: [newEmbed], components: []})

        giveawaysMap.delete(giveawayID);
        writeFile("./Utils/Data/giveaways.json", client.mapToJSON(giveawaysMap), err => {
            if (err) console.error(err)
        });
    }, time/(24*60*60*1000));
}