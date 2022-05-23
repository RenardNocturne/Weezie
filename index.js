const { loadCommands, loadEvents, registerCommands, loadButtons } = require('./Utils/loader')
const {Client, Intents, Collection} = require('discord.js');
require("dotenv").config()


const client = new Client({intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
]});

client.config = require("./Utils/Data/config.json");
require('./Utils/functions')(client);
require("./Utils/Log/logger")(client);
require("./Utils/levels.js")(client);

client.commands = new Collection();
client.buttons = new Collection();


loadEvents(client)
loadCommands(client)
loadButtons(client)
registerCommands();

process.on("exit", (code) => {
    client.error(undefined, `🔥 Process is exiting with code ${code.toString()}...`)
})

process.on('uncaughtException', (err, origin) => { 
    client.error(err, `🔥 UNCAUGHT_EXCEPTION at ${origin.toString()} !`) 
});

process.on('unhandledRejection', async (reason, promise) => {
    client.error(undefined, `🔥 UNHANDLED_REJECTION at ${promise} with the reason ${reason} !`)
    console.log(promise);
});

client.login(process.env.TOKEN)
