module.exports = async (client, message) => {
    if (message.author.bot) return;
    const exp = client.randomIntFromInterval(1, 10)
    client.addExp(message.member, exp, message.channel)
}