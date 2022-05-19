const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, WebhookClient } = require("discord.js");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test command"),
    execute: async (client, interaction) => {
        //json message
        const hook = new WebhookClient({id: process.env.WEBHOOKID, token: process.env.WEBHOOKTOKEN});
        hook.send({
            // 975818633949360148
            "content": "Notification pour <@&> !",
            "embeds": [{
                "description": "Viens rejoindre le stream ! C'est pour ton bien ! 👍",
                "color": "0x9445FF",
                "footer": {
                    "text": "Lancé le {{CreatedAt}}",
                    "icon_url": "https://upload.wikimedia.org/wikipedia/commons/d/dd/LOGO_TWITCH_CAR_JE_LIVE_SUR_TWITCH_ET_J%27AI_60_000_ABONEE.png"
                },
                "image": {
                    "url": "{{StreamPreview}}"
                },
                "author": {
                    "name": "{{ChannelName}}",
                    "url": "{{ChannelUrl}}",
                    "icon_url": "https://upload.wikimedia.org/wikipedia/commons/d/dd/LOGO_TWITCH_CAR_JE_LIVE_SUR_TWITCH_ET_J%27AI_60_000_ABONEE.png"
                },
            }]
        })
    }
}