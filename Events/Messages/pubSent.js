const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = (client, message) => {
    const verifChannel = client.channels.cache.get(client.config.IDs.channels.verifChannel)
    if (message.embeds[0]) message.content = message.embeds[0].description;
    message.channel.messages.fetch({ limit: 3}, {cache: true}).then(m => {
        const oldMsg = m.find(m => m.author.id === client.user.id);
        if (oldMsg) oldMsg.delete().catch(err => console.log(err));
    })  

    const pubEmbed = new MessageEmbed()
        .setAuthor(`🎉 Message envoyé sur  ${message.guild.name} !`, message.guild.iconURL())
        .setDescription(`<@!${message.author.id}>, merci pour ton message sur ${message.guild.name} ! \n \n **__❗ Pour éviter que ton message ne soit refusé:__** \n ➜ Ton message doit être compréhensible ! \n ➜ Merci de respecter les TOS de et le règlement ! \n ➜ Message en rapport avec le développement !`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`${message.channel.guild.name} et tes projets vont plus loin !`, message.channel.guild.iconURL())
        .setTimestamp()
        .setColor(client.config.colors.default);

    const verifEmbed =  new MessageEmbed()
        .setAuthor(`Message de ${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`**__📋 Contenu :__** \n ${message.content} \n \n **__👤 Auteur :__** \`\`${message.author.username}\`\` / <@!${message.author.id}>  \n \n **__📌 Salon :__** <#${message.channel.id}> \n \n **[🔗 Sauter vers le message afin d'en savoir plus !](${message.url})**`)
        .setFooter('Utilisez les boutons ci-dessous pour valider ou non le message !', message.channel.guild.iconURL())
        .setTimestamp()
        .setColor(client.config.colors.default);

    const row = new MessageActionRow()
        .addComponents([
        new MessageButton()
            .setCustomId(`valid/${message.id}/${message.channel.id}`)
            .setLabel('Valider !')
            .setStyle('SUCCESS'),

        new MessageButton()
            .setCustomId(`invalid/${message.id}/${message.channel.id}`)
            .setLabel('Supprimer !')
            .setStyle('DANGER')
        ]);
    
    message.react('⏳');
    message.channel.send({embeds: [pubEmbed]});
    verifChannel.send({embeds: [verifEmbed], components: [row]});
}