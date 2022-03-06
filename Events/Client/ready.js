const Discord = require("discord.js");
const messages = require("../../Utils/messages.json")

module.exports = async (client) => {
    console.log("🚀 Bot successfully logged in !");

    const activitiesTypes = messages.status.activitiesTypes
    activitiesTypes.push("PLAYING")

    let i = 0;
    setInterval(() => {
        let activities = messages.status.statusMessages
        activities.push(`compter ${client.guilds.cache.get("825760704241991752").memberCount} membres !`)

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