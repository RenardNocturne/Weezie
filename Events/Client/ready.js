const { Client, MessageEmbed, MessageAttachment } = require("discord.js");
const messages = require("../../Utils/Data/messages.json")
const db = require("quick.db")
require("dotenv").config()

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    console.log("🚀 Bot successfully logged in !");

    // pour avoir les emojis customs sans nitro
    // console.log(client.guilds.cache.get(client.config.IDs.guild).emojis.cache)

    function loopStatus () {
        const activitiesTypes = messages.status.activitiesTypes //Définition des types d'activités
        const activities = messages.status.statusMessages
        activitiesTypes.push("PLAYING") //parce que j'ai pas envie de le mettre dans le json

        async function changeActivity () {

            //Une fonction qui change l'activité du bot
            function timeout(activity, activityType) { 
                return new Promise(resolve => setTimeout(() => {
                    client.user.setPresence({ activities: [{ name: activity, type: activityType }], status: 'online'})
                    resolve()
                }, 10000)) 
            }

            activities[activities.length] = `compter ${client.guilds.cache.get(client.config.IDs.guild).memberCount} membres !` //On réactualise

            //On boucle sur les activités
            for (let i = 0; i < activities.length; i++) {
                await timeout(activities[i], activitiesTypes[i])
            }

            changeActivity() //encore
        }
        
        changeActivity()
    }


    // Système de récupération des statuts custom
    setInterval(() => {
        client.guilds.cache.get(process.env.GUILDID).members.cache.forEach(async member => {
            const state = member.presence?.activities.find(activity => activity.type === "CUSTOM")?.state
            if (!state?.includes("https://discord.gg/WumhCgGPrD") && !state?.includes("discord.gg/WumhCgGPrD") && !state?.includes(".gg/WumhCgGPrD")) return  
            
            const hadAlreadyChanged = await db.get(`${member.id}.hadAlreadyChangedStatus`)
            if (hadAlreadyChanged) return client.addExp(member, client.random(7, 15))
            
            const exp = 50
            const embed = new MessageEmbed()
                .setAuthor(`Merci ${member.user.tag} !`, member.user.displayAvatarURL())
                .setDescription(`✨ <@!${member.id}> vient de modifier son statut pour \`${state}\` pour la première fois ! \n Merci beaucoup ♥ \n 🎁 Tu gagnes **${exp} points d'expérience** ainsi qu'**entre 14 et 30 points d'expérience par jour** si tu gardes ce lien dans ton statut !`)
                .setFooter(`Starboard de ${client.guilds.cache.get(process.env.GUILDID).name}`, client.guilds.cache.get(process.env.GUILDID).iconURL())
                .setColor(client.config.colors.default)
                .setTimestamp();
        
            client.channels.cache.get(client.config.IDs.channels.starboard).send({embeds: [embed]})
            client.addExp(member, exp)
            db.set(`${member.id}.hadAlreadyChangedStatus`, true)
        })
    }, 12*60*60*1000) //toutes les 12 heures

    loopStatus()
}