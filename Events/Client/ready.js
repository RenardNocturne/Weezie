const Discord = require("discord.js");

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

    let commands = client.guilds.cache.get("825760704241991752").commands

    commands.create({
        name: "clear",
        description: "Nettoie plusieurs messages dans le salon actuel.",
        options: [
            {
                name: "messages",   
                description: "Nombre de messages à supprimer compris entre 1 et 99.",
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.INTEGER
            },
        ]
    })
}