const { writeFile, readFileSync } = require("fs");
const { Permissions } = require("discord.js");

module.exports = {
    name: "deleteGiveaway",
    async execute (client, interaction) {
        const giveaways = JSON.parse(readFileSync('./Utils/Data/giveaways.json'));
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return  interaction.reply({content: "❌ Vous n'avez pas la permission requise !", ephemeral: true})
        
        const giveawayID = interaction.customId.split("/").slice(1)[0];
        const giveawaysMap = client.JSONToMap(giveaways);

        interaction.message.delete().catch(err => null).then(() => interaction.reply({content: "❌ Le giveaway a été supprimé !", ephemeral: true}))

        giveawaysMap.delete(giveawayID);
        writeFile("./Utils/Data/giveaways.json", client.mapToJSON(giveawaysMap), err => {
            if (err) console.error(err)
        });
    }
}