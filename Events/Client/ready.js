module.exports = async (client) => {
    console.log("🚀 Bot successfully logged in !");

    const activitiesTypes = [
        'WATCHING',
        'PLAYING',
    ];

    let i = 0;
    setInterval(() => {
        let activities = [
            `${client.guilds.cache.get("825760704241991752").memberCount} membres !`,
            'lancer des boules de neige sur Muzikae...',
        ];

        const newActivity = activities[i];
        const newActivityType = activitiesTypes[i];
        client.user.setPresence({ activities: [{ name: newActivity, type: newActivityType }], status: 'online'})

        if (i < 1) {
            i++;
        } else {
            i = 0;
        }

    }, 10000);
}