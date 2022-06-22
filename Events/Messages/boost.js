const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = (client, message, member) => {
    const img = new MessageAttachment('Images/boostImage.jpg')
    const ct = client.guilds.cache.get(client.config.IDs.guild)

    const boosterEmbed = new MessageEmbed() 
        .setAuthor(`${member.user.tag} vient de booster le serveur !`, member.user.displayAvatarURL())
        .setDescription(`<a:boost:988386530986962954> **Merci beaucoup** à toi ${member.user.username}, grâce à toi le serveur est au niveau **${ct.premiumTier === "NONE" ? "0" : ct.premiumTier === "TIER_1" ? "1" : ct.premiumTier === "TIER_2" ? "2" : "3"}** avec **${ct.premiumSubscriptionCount > 1 ? ct.premiumSubscriptionCount + "** boosts" : ct.premiumSubscriptionCount + "** boost"} ! <a:tada:989221792818282567> \n\n Pour fêter ça, je t'offre **1000 points d'expérience** !`)
        .setFooter(`Merci beaucoup ${member.user.username} !`, member.user.displayAvatarURL())
        .setImage('attachment://boostImage.jpg')
        .setColor(client.config.colors.boost)
        .setTimestamp();

    client.addExp(member, 1000)
    client.channels.cache.get(client.config.IDs.channels.starboard).send({embeds: [boosterEmbed], files: [img]}).catch(err => console.log("Une erreur est survenue ! \n\n" + err))
}