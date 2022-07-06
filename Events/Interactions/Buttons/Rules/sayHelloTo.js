const { Client, ButtonInteraction, WebhookClient } = require('discord.js')
const messages = require("../../../../Utils/Data/messages.json")
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

        const targetID = interaction.customId.split("/")[1]
        const targetMember = interaction.guild.members.cache.get(targetID)

        const hook = new WebhookClient({url: process.env.WelcomeWebhook})    
        hook.edit({name: interaction.member.displayName, avatar: interaction.member.displayAvatarURL()}).then(() => {
            hook.send({content: messages.welcome[client.random(0, messages.welcome.length)].replace("$username", targetMember.displayName)})
        })
    }   
}