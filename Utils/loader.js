const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const loadEvents = (client, dir = './Events') => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));

        for (const event of events) {
            const evt = require(`../${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
            client.on(evtName, evt.bind(null, client));

            console.log(`✅ L'évènement ${evtName} a bien été chargée !`);
        };
    });
};  
  
const loadCommands = (client, dir = './Commands') => {
    readdirSync(dir).forEach(dirs => {
        const commandFiles = readdirSync(`${dir}/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(command.data.name, command);
            console.log(`✅ Commande ${command.data.name} chargée avec succès !`);
        }
    });
};

const loadButtons = (client, dir = './Events/Interactions/Buttons') => {
    readdirSync(dir).forEach(dirs => {
        const buttons = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js"));

        for (const file of buttons) {
            const command = require(`../${dir}/${dirs}/${file}`);
            client.buttons.set(command.name, command);
            console.log(`✅ Le bouton ${command.name} a bien été chargée !`);
        };
    });
};

const registerCommands = (dir = './Commands') => {
    const commands = [];
    readdirSync(dir).forEach(dirs => {
        const commandFiles = readdirSync(`${dir}/${dirs}`).filter(file => file.endsWith('.js'));
    
        for (const file of commandFiles) {
            const command = require(`../${dir}/${dirs}/${file}`);
            commands.push(command.data.toJSON());
        }
    });
    
    const rest = new REST({ version: '9' }).setToken(process.env.Token);
    
    rest.put(Routes.applicationGuildCommands(process.env.ClientID, process.env.GuildID), { body: commands })
        .then(() => console.log('📌 Successfully registered application commands.'))
        .catch(console.error);
}


module.exports = {
    loadEvents,
    loadCommands,
    registerCommands,
    loadButtons
}