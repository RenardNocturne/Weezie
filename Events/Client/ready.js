const messages = require("../../Utils/Data/messages.json")

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
                await timeout(activities[i], activitiesTypes[i]).then(() => console.log("done !")); 
            }

            changeActivity() //encore
        }
        
        changeActivity()
    }
    
    loopStatus()
}