const { readdirSync } = require('fs');

const loadEvents = (client, dir = './Events') => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js" || ".ts"));

        for (const event of events) {
        const evt = require(`../${dir}/${dirs}/${event}`);
        const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client));

        console.log(`L'évènement ${evtName} a bien été chargée !`);
        };
    });
};
  
  
  
const loadCommands = (client, dir = './Commands') => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}`).filter(files => files.endsWith(".js") || files.endsWith(".ts"));

        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`La commande ${getFileName.help.name} a bien été chargée !`);
        };
    });
};

module.exports = {
    loadEvents,
    loadCommands
}