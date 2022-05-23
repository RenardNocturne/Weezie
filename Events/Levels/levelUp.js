const { Client, GuildMember, TextChannel } = require("discord.js");

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 * @param {TextChannel} channel 
 */
module.exports = (client, member, newCurrentExp, channel) => {
    client.getLevelInfo(member).then(async (info) => {
        //Tant qu'il y a plus d'exp que ce dont le niveau a besoin
        while (newCurrentExp >= info.levelExp) {
            newCurrentExp -= info.levelExp; //On retire l'exp
            info.level += 1; //On ajoute un niveau
            info.levelExp = Math.ceil(info.levelExp * 1.04); //On augmente l'exp nécessaire pour le prochain niveau
            //Pour les matheux, on utilise une suite géométrique Vn+1 = Vn * 1.04 soit 4% en plus de ce qu'il fallait avant 
        }

        await client.setLevelInfo(member, {exp: newCurrentExp, level: info.level, levelExp: info.levelExp}).then(() => {
            client.sendLevelCard(member, info, newCurrentExp, channel)
        })
    })
}