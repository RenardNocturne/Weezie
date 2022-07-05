const { Client, VoiceState, Permissions } = require("discord.js");
const { writeFile, readFileSync } = require("fs")

/**
 * 
 * @param {Client} client 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */
module.exports = async (client, oldState, newState) => {
    const joinToCreateChannelId = client.config.IDs.channels.joinToCreate

    const channels = JSON.parse(readFileSync('./Utils/Data/personalVoiceChannels.json'));
    const channelsMap = client.JSONToMap(channels);
    if (newState.channelId === joinToCreateChannelId && oldState.channelId !== joinToCreateChannelId) return newState.guild.channels.create(`👤 Salon de ${newState.member.displayName}`, {
            type: 'GUILD_VOICE',
            topic: `Salon personnel de ${newState.member.displayName} !`,
            position: client.channels.cache.get(client.config.IDs.categories.general).children.size,
            reason: `Création du salon personnel de ${newState.member.displayName} !`,
            parent: client.config.IDs.categories.general,
            permissionOverwrites: [
                {
                    id: newState.member.id, //Celui qui a ouvert le ticket
                    allow: ['CONNECT', 'DEAFEN_MEMBERS', 'MUTE_MEMBERS', 'MANAGE_CHANNELS', 'MOVE_MEMBERS']
                },
            ],
        }).then(channel => {
            newState.setChannel(channel)
            channelsMap.set(newState.member.id, channel.id)
            writeFile("./Utils/Data/personalVoiceChannels.json", client.mapToJSON(channelsMap), err => {
                if (err) console.error(err)
            });
        })
    

    //Si l'ancien salon c'est le salon perso et que le nouveau ça l'es pas
    if (channelsMap.get(newState.member.id) === oldState.channelId && channelsMap.get(newState.member.id) !== newState.channelId) {
        channelsMap.delete(newState.member.id);
        writeFile("./Utils/Data/personalVoiceChannels.json", client.mapToJSON(channelsMap), err => {
            if (err) console.error(err)
            
        });
        return oldState.channel.delete().catch(e => null)
    }
}