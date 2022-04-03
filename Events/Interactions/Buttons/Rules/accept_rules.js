const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment, MessageSelectMenu, Permissions } = require('discord.js')
const { createCanvas, loadImage } = require('canvas')

module.exports = {
    name: "accept_rules",
    async execute (client, interaction) {
        if (!interaction.member.roles.cache.get('825861210619641916')) {
            interaction.member.roles.add('825861210619641916')
            //Creating canvas
            const applyText = (canvas, text) => {
                const context = canvas.getContext('2d');
                let fontSize = 70;
            
                do {
                    context.font = `${fontSize -= 10}px Arial`;
                } while (context.measureText(text).width > canvas.width - 300);
                return context.font;
            };

            const canvas = createCanvas(700, 250);
            const context = canvas.getContext('2d');

            const background = await loadImage('./Images/welcomeBackground.png');
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
            
            context.font = '42px Arial';
            context.fillStyle = '#fff';
            context.fillText('Bienvenue', canvas.width / 2.5, canvas.height / 2.5);
            context.font = applyText(canvas, `${interaction.member.displayName} !`);
            context.fillStyle = '#fff';
            context.fillText(`${interaction.member.displayName} !`, canvas.width / 2.5, canvas.height / 1.4);

            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            const avatar = await loadImage(interaction.user.displayAvatarURL({ format: 'jpg' }));
            context.drawImage(avatar, 25, 25, 200, 200);

            const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

            interaction.reply({content: `Bienvenue <@!${interaction.user.id}> ! :tada:`, ephemeral: true})
            const welcomeEmbed = new MessageEmbed()
                .setTitle('Ho ! Un nouveau membre !')
                .setDescription(`🎉 Bienvenue ${interaction.user.username} 🎉!`)
                .setColor(client.defaultColor)
                .setImage('attachment://profile-image.png')
            client.channels.cache.get('834780676166516836').send({embeds: [welcomeEmbed], files: [attachment]})
        } else {
            interaction.reply({content: `<@!${interaction.user.id}>, tu as déjà accepté les règles ! `, ephemeral: true})
        }
    }
}