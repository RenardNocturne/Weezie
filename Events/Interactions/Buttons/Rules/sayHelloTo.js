const { MessageEmbed, MessageActionRow, MessageButton, Client, CommandInteraction, ButtonInteraction, WebhookClient } = require('discord.js')
require("dotenv").config()

module.exports = {
    name: "sayHelloTo",
    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @returns
     */
    async execute (client, interaction) {
        interaction.deferUpdate()        
        const hook = new WebhookClient({url: process.env.WelcomeWebhook})    
        hook.edit({name: interaction.member.displayName, avatar: interaction.member.displayAvatarURL()}).then(() => {
            hook.send({content: `👋 Bienvenue !`})
        })
    }   
}