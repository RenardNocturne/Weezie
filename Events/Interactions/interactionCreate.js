module.exports = (client, interaction) => {
    if (interaction.isCommand()) {
        const commandName = interaction.commandName
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

        //sécurité
        if (interaction.user.bot || !command) return;

        if(!interaction.member.permissions.has(command.help.userPerms)) return interaction.reply({content: `🔒 Vous n'avez pas les permission requises: \n > ${command.help.userPermsFR.join(' \n > ')}`, ephemeral: true})

        command.run(client, interaction)

    } else if (interaction.isSelectMenu()) {
        switch (interaction.customId) {
            case "autoroles":
                client.emit("autoroles", interaction)
                break;
            case "autorolesDev":
                client.emit("autorolesDev", interaction)
                break;
        }
    } else if (interaction.isButton()) {
        switch (interaction.customId) {
            case "accept_rules":
                client.emit("rules", interaction) 
        }
    }
}