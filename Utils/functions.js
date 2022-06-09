const { GuildMember, MessageEmbed } = require("discord.js")

module.exports = client => {
    client.random = (min, max) => { 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    client.JSONToMap = (json) => {
        const map = new Map()
        for (const [key, value] of Object.entries(json)) {
            map.set(key, value)
        }
        return map
    }

    client.mapToJSON = (map) => {
        const json = {}
        for (const [key, value] of map) {
            json[key] = value
        }
        return JSON.stringify(json)
    }

    client.setDaysTimeout = (callback, days) => {
        // 86400 seconds in a day
        let msInDay = 86400*1000; 
    
        let dayCount = 0;
        let timer = setInterval(function() {
            dayCount++;  // a day has passed
    
            if (dayCount === days) {
               clearInterval(timer);
               callback.apply(this, []);
            }
        }, msInDay);
    }

    client.isHex = (h) => {
        var a = parseInt(h, 16);
        return (a.toString(16) === h.toLowerCase())
    }
}