const Discord = require("discord.js");
const messages = require("../../Utils/Data/messages.json")

module.exports = async (client) => {
    console.log("🚀 Bot successfully logged in !");

    // pour avoir les emojis customs sans nitro
    // console.log(client.guilds.cache.get(client.config.IDs.guild).emojis.cache)

    const activitiesTypes = messages.status.activitiesTypes
    activitiesTypes.push("PLAYING")

    let i = 0;
    setInterval(() => {
        let activities = messages.status.statusMessages
        activities.push(`compter ${client.guilds.cache.get(client.config.IDs.guild).memberCount} membres !`)

        const newActivity = activities[i];
        const newActivityType = activitiesTypes[i];
        client.user.setPresence({ activities: [{ name: newActivity, type: newActivityType }], status: 'online'})
        activities.pop()

        if (i < activities.length) {
            i++;
        } else {
            i = 0;
        }

    }, 10000);
}