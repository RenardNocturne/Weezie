const { MessageEmbed } = require("discord.js")

module.exports = async (client, reaction, user) => {
    const message = reaction.message;
    if (message.embeds[0]) message.content = message.embeds[0].description //Si y a un embed on donne les description

    const sendToStarboard = () => {
        const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(message.content !== '' ? `Nouveau message en provenance de <#${message.channelId}> (#${message.channel.name}) ! \n \n ${message.content} \n \n *- ${message.author.tag}*` :  `Nouveau message en provenance de <#${message.channelId}> !`)
        .setFooter(`Starboard de ${message.guild.name}`, message.guild.iconURL())
        .setColor(client.config.colors.default)
        .setTimestamp();
    
        if (message.attachments) message.attachments.forEach(img => {
            embed.setImage(img.url)
        })
        
        client.channels.cache.get(client.config.IDs.channels.starboard).send({embeds: [embed]})
    }


    if (await client.checkIfMemberHasLevelAbove(message.member, 60) && reaction.emoji.name === "⭐" && reaction.count >= 3) { //Si on a 3 reactions étoile ou plus et qu'il est au dessus de 60 niveaux on envoie l'embed
        sendToStarboard()
    } else if (reaction.emoji.name === "⭐" && reaction.count >= 5) { //Si on a 5 reactions étoile ou plus on envoie l'embed
        sendToStarboard()
    }
}