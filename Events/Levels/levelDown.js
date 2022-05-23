module.exports = async  (client, member, expToRemove, channel) => {
    client.getLevelInfo(member).then(async (info) => {
        if (info.level <= 0) {
            info.exp = 0; //Si on est déjà au lvl 0 il peut pas lvl down alors on set l'exp à 0
            await client.setLevelInfo(member, {exp: info.exp, level: info.level, levelExp: info.levelExp}).then(() => {
                client.sendLevelCard(member, info, info.exp, channel, `🔥 ${member.user.username} est tombé au niveau ${info.level} !`);
            })
        }
        info.exp = info.exp + expToRemove //positif - positif 
        //on retire tout à l'exp

        //Tant que c'est pas stabilisé
        while (info.exp < 0) {
            if (info.level <= 0) {
                info.exp = 0; //Si on est déjà au lvl 0 il peut pas lvl down alors on set l'exp à 0 
                break;
            }  else {
                info.level--; //On descend de niveau
                info.levelExp = Math.floor(info.levelExp / 1.04); //On réajuste l'exp max
                info.exp += info.levelExp; //Et du cou son exp c'est son reste (négatif) + l'exp max du niveau
            }
        }
            
        await client.setLevelInfo(member, {exp: info.exp, level: info.level, levelExp: info.levelExp}).then(() => {
            client.sendLevelCard(member, info, info.exp, channel, `🔥 ${member.user.username} est tombé au niveau ${info.level} !`);
        })
    })
}