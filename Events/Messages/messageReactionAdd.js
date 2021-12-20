const { MessageEmbed } = require("discord.js")

module.exports = async (client, reaction, user) => {
    const message = reaction.message;

    if (message.embeds[0]) return //Si y a un embed on return car ou c'est un bot ou c'est un self-bot

    if (reaction.emoji.name === "⭐" && reaction.count >= 1) { //Si on a 5 reactions étoile ou plus on envoie l'embed

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(message.content !== '' ? `Nouveau message en provenance de <#${message.channelId}> (#${message.channel.name}) ! \n \n ${message.content} \n \n *- ${message.author.tag}*` :  `Nouveau message en provenance de <#${message.channelId}> !`)
            .setFooter(`Starboard de ${message.guild.name}`, message.guild.iconURL())
            .setColor(client.defaultColor)
            .setTimestamp();
        
        if (message.attachments) message.attachments.forEach(img => {
            embed.setImage(img.url)
        })
        
        client.channels.cache.get("922545697113407518").send({embeds: [embed]})
    }
}