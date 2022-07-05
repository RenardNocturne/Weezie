module.exports = async  (client, member, expToRemove, channel) => {
    client.getLevelInfo(member).then(async (info) => {
        info.exp = info.exp + expToRemove //positif - positif 
        //on retire tout à l'exp

        let newRole;
        const oldRole = eval(`client.config.IDs.roles.levels[${Math.floor((info.level / 10) - 1)}]`)

        if (info.level <= 0) {
            info.exp = 0; //Si on est déjà au lvl 0 il peut pas lvl down alors on set l'exp à 0
            await client.setLevelInfo(member, {exp: info.exp, level: info.level, levelExp: info.levelExp})
        }

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
        
        // niveau 10 -> 10/10 -> 1 - 1 => 0
        newRole = eval(`client.config.IDs.roles.levels[${Math.floor((info.level / 10) - 1)}]`)
        if (newRole) {
            if (!member.roles.cache.has(newRole)) {
                member.roles.add(newRole)
                client.config.IDs.roles.levels.forEach(roleID => {
                    if (roleID != newRole) member.roles.remove(roleID).catch(e => console.log(e));
                })
            }
        } else {
            client.config.IDs.roles.levels.forEach(roleID => {
                if (roleID != newRole) member.roles.remove(roleID).catch(e => console.log(e));
            })
        }

        await client.setLevelInfo(member, {exp: info.exp, level: info.level, levelExp: info.levelExp}).then(() => {
            client.sendLevelCard(member, info, info.exp, channel, newRole != oldRole ? `🧨 ${member.displayName} est tombé au niveau ${info.level} et a perdu le niveau <@&${oldRole}> !` : `🔥 ${member.displayName} est tombé au niveau ${info.level} !`);
        })
    })
}