const { writeFile, readFileSync } = require("fs");
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: "endGiveaway",
    async execute (client, interaction) {
        const giveaways = JSON.parse(readFileSync('./Utils/Data/giveaways.json'));
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return  interaction.reply({content: "❌ Vous n'avez pas la permission requise !", ephemeral: true})
        
        const giveawayID = interaction.customId.split("/").slice(1)[0];
        const giveawaysMap = client.JSONToMap(giveaways);
        const giveaway = giveawaysMap.get(giveawayID);
        const winners = [];

        if (giveaway.total < giveaway.winner) return interaction.reply({content: "❌ Il n'y a pas assez de participants !", ephemeral: true})

        while (winners.length != giveaway.winner && giveaway.hasVoted.length > 0 ) {
            const newWinner = giveaway.hasVoted[client.random(0, giveaway.hasVoted.length - 1)];
            winners.push(newWinner);
            giveaway.hasVoted = giveaway.hasVoted.filter(user => user !== newWinner);
        }

        const newEmbed = new MessageEmbed()
            .setAuthor("Giveaway fini !", interaction.guild.iconURL())
            .setDescription(`⏳ Fini ! \n\n 👤 Gagnants: <@${winners.join(">, <@")}> \n\n 🎁 Récompense: \`${giveaway.price}\` \n\n *${giveaway.total} participants !*`)
            .setColor(client.config.colors.success)
            .setTimestamp()
            .setFooter(`Giveaway achevé par ${interaction.user.username}`, interaction.user.displayAvatarURL())

        interaction.update({embeds: [newEmbed], components: []})

        giveawaysMap.delete(giveawayID);
        writeFile("./Utils/Data/giveaways.json", client.mapToJSON(giveawaysMap), err => {
            if (err) console.error(err)
        });
    }
}