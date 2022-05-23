module.exports = async (client, message) => {
    if (message.author.bot) return;
    const exp = client.randomIntFromInterval(1, 10)
    console.log("Exp added: " + exp);
    client.addExp(message.member, exp, message.channel)
}