const db = require("quick.db");
const canvacord = require("canvacord");
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = (client) => {
    client.addExp = async (member, exp, channel) => {
        if (exp < 0) return; //Pas de négatifs
        let info = await client.getLevelInfo(member);
        if (!info) info = await client.setLevelInfo(member, {exp: 0, level: 0, levelExp: 100})
        const newCurrentExp = info.exp + exp  //On ajoute l'exp 
        newCurrentExp >= info.levelExp ? client.emit("levelUp", member, newCurrentExp, channel) : await db.add(`levels.${member.id}.exp`, exp)
        //Si on a atteint le niveau suivant on lance le levelUp sinon on ajoute l'exp        
    }

    client.removeExp = async (member, exp, channel) => {
        if (exp < 0) return; //Pas de négatifs
        let info = await client.getLevelInfo(member);
        if (!info) return
        const newCurrentExp = info.exp - exp  //On retire l'exp
        newCurrentExp < 0 ? client.emit("levelDown", member, newCurrentExp, channel) : await db.add(`levels.${member.id}.exp`, -exp)
    }

    client.sendLevelCard = (member, info, newCurrentExp, method, message = `🚀 ${member.user.username} a atteint le niveau ${info.level} !`) => {
        const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhca6IRoPzXyTXkhlBmK9DG3C0xD0C-KiLpwqzBpvbtYauXSMFrn3WOKAHT-v1aXRGsQ&usqp=CAU";

        const rank = new canvacord.Rank()
            .setOverlay("#FFFFFF", 0, false)
            .setAvatar(member.user.displayAvatarURL({format: "png"}))
            .setLevel(info.level)
            .setCurrentXP(newCurrentExp)
            .setFontSize("20px")
            .renderEmojis(true)
            .setBackground("IMAGE", img)
            .setRequiredXP(info.levelExp)
            .setStatus(member.presence?.status ? member.presence?.status : "idle")
            .setRank(0, "RANK", false)
            .setProgressBar(`#${client.config.colors.default}`, "COLOR")
            .setUsername(member.user.username)
            .setDiscriminator(member.user.discriminator);

        rank.build()
            .then(data => {
                const RankCard = new MessageAttachment(data, "RankCard.png");

                const embed = new MessageEmbed()
                    .setAuthor(`${member.user.username}`, member.user.displayAvatarURL())
                    .setDescription(message)
                    .setColor(client.config.colors.default)
                    .setFooter("Système de niveaux de " + member.guild.name + " !", member.guild.iconURL())
                    .setImage("attachment://RankCard.png")    
                
                    try {
                        method.send({embeds: [embed], files: [RankCard]})
                    } catch (e) {
                        method.reply({embeds: [embed], files: [RankCard]})
                    }
            });
    }

    client.setLevelInfo = async (member, info) => {
        await db.set(`levels.${member.id}`, info)
        const newInfos = await client.getLevelInfo(member)
        return newInfos;
    }

    client.getExp = async (member) => {
        const exp = await db.get(`levels.${member.id}.exp`)
        return exp
    }

    client.getLevelInfo = async (member) => {
        const info = await db.get(`levels.${member.id}`)
        return info;
    }
}