const { loadCommands, loadEvents } = require('./Utils/loader')
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

require('./Utils/functions')(client);

const collecs = ["commands"]
collecs.forEach(element => client[element] = new Collection());

loadEvents(client)
loadCommands(client)

client.login(process.env.TOKEN)