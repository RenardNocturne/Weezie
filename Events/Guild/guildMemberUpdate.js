const { MessageEmbed, MessageAttachment, Client, GuildMember } = require('discord.js')

/**
 * 
 * @param {Client} client 
 * @param {GuildMember} oldMember 
 * @param {GuildMember} newMember 
 */

module.exports = async (client, oldMember, newMember) => {

    async function createPersonalChannel (member, reason, timeInDays, timeInSeconds) {
        await member.guild.channels.create(`⭐・${member.displayName}`, {
            type: 'text',
            topic: `Salon personnel de ${member.displayName} !`,
            position: 1,
            reason: `Création du salon personnel de ${member.displayName} !`,
            parent: client.config.IDs.categories.personalChannels,
            permissionOverwrites: [
                {
                    id: member.id, //Celui qui a ouvert le ticket
                    allow: ['SEND_MESSAGES'],
                },
            ],
        }).then(channel => {
            const embed = new MessageEmbed()
                .setAuthor(`Salon personnel de ${member.displayName}`, member.displayAvatarURL())
                .setDescription(`Voici ton salon <@${member.id}> ! N'oublies pas qu'ici aussi les <#${client.config.IDs.channels.rules}> s'appliquent ! \n\n 🎉 Salon acquis le <t:${Math.round(Date.now()/1000)}> \n\n 👤 Créateur: <@${member.id}> \n\n 📜 Raison: \`${reason}\` \n\n ⏳ Se termine <t:${Math.round(Date.now()/1000 + timeInSeconds)}:R> !`)
                .setFooter(`Merci d'avoir été si actif sur ${member.guild.name}`, member.guild.iconURL())
                .setColor(client.config.colors.default)
            channel.send({content: `Voici ton salon <@${member.id}> !`, embeds: [embed]})
            .then(() => {
                client.setDaysTimeout(() => {
                    channel.delete(`Suppression du salon personnel de ${member.displayName} !`)
                }, timeInDays)
            })
        })
    }

    if (!oldMember.roles.cache.has(client.config.IDs.roles.levels[4]) && newMember.roles.cache.has(client.config.IDs.roles.levels[4])) return newMember.roles.add(client.config.IDs.roles.partnershipTicket)
    if (!oldMember.roles.cache.has(client.config.IDs.roles.levels[7]) && newMember.roles.cache.has(client.config.IDs.roles.levels[7])) return await createPersonalChannel(newMember, "Récompense du niveau 80 !", 7, 7*24*60*60)
    if (!oldMember.roles.cache.has(client.config.IDs.roles.levels[9]) && newMember.roles.cache.has(client.config.IDs.roles.levels[9])) return await createPersonalChannel(newMember, "Récompense du niveau 100 !", 30, 30*24*60*60)
}