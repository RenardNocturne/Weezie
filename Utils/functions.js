module.exports = client => {
    client.randomIntFromInterval = (min, max) => { 
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
}