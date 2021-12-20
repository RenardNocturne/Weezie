const { MessageEmbed, MessageAttachment } = require("discord.js")

module.exports = async (client, member) => {
    if (!member.roles.cache.get("825861210619641916")) return
    
    const leaveImg = new MessageAttachment("Images/leaveImage.jpg")
    
    const embed = new MessageEmbed()
        .setTitle("Un membre vient de nous quitter !")
        .setDescription(`Adieu ${member.user.tag} :sob:`)
        .setThumbnail(member.user.displayAvatarURL())
        .setImage("attachment://leaveImage.jpg")
        .setColor(client.errorColor);
    
    client.channels.cache.get("922524034971889724").send({embeds: [embed], files: [leaveImg]})
} 