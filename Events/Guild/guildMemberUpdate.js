const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = async (client, oldMember, newMember) => {
    if (!oldMember.roles.cache.has(client.config.IDs.roles.boost) && newMember.roles.cache.has(client.config.IDs.roles.boost)) {
        const img = new MessageAttachment('Images/boostImage.jpg')
        const ct = client.guilds.cache.get(client.config.IDs.guild)

        const boosterEmbed = new MessageEmbed() 
            .setAuthor(`${newMember.user.tag} vient de booster le serveur !`, newMember.user.displayAvatarURL())
            .setDescription(`<a:boost:929426241398911068> **Merci beaucoup** à toi ${newMember.user.username}, grâce à toi le serveur est au niveau **${ct.premiumTier === "NONE" ? "0" : ct.premiumTier === "TIER_1" ? "1" : ct.premiumTier === "TIER_2" ? "2" : "3"}** avec **${ct.premiumSubscriptionCount > 1 ? ct.premiumSubscriptionCount + "** boosts" : ct.premiumSubscriptionCount + "** boost"} ! <a:tada:929426375012646973>`)
            .setFooter(`Merci beaucoup ${newMember.user.username} !`, newMember.user.displayAvatarURL())
            .setImage('attachment://boostImage.jpg')
            .setColor(client.config.colors.boost)
            .setTimestamp();

        client.channels.cache.get(client.config.IDs.channels.starboard).send({embeds: [boosterEmbed], files: [img]}).catch(err => console.log("Une erreur est survenue ! \n\n" + err))
    }
}