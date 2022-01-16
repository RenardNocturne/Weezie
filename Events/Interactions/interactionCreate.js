module.exports = (client, interaction) => {
    if (interaction.isCommand()) {
        const commandName = interaction.commandName
        const command = client.commands.get(interaction.commandName);

        //sécurité
        if (interaction.user.bot || !command) return;

        if(!interaction.member.permissions.has(command.userPerms)) return interaction.reply({content: `🔒 Vous n'avez pas les permission requises: \n > ${command.userPermsFR.join(' \n > ')}`, ephemeral: true})
        try {
            command.execute(client, interaction)
            .then(() => {
                console.log(`✅ Commande ${command.data.name} réalisée avec succès !`);
            })
        } catch (err) {
            interaction.reply({content: "Une erreur est survenue lors de l'interaction !"})
            console.log(err);
        }

    } else if (interaction.isSelectMenu()) {
        switch (interaction.customId) {
            case "autoroles":
                client.emit("autoroles", interaction)
                break;
            case "autorolesDev":
                client.emit("autorolesDev", interaction)
                break;
            case "ticket":
                client.emit("ticket", interaction) 
        }
    } else if (interaction.isButton()) {
        const commandName = interaction.customId.split("/")[0]
        const command = client.buttons.get(commandName);

        //sécurité
        if (interaction.user.bot || !command) return;
        
        try {
            command.execute(client, interaction)
            .then(() => {
                console.log(`✅ Bouton ${command.name} réalisée avec succès !`);
            })
        } catch (err) {
            console.log(`❌ Une erreur est survenue lors de l'interaction du bouton ${command.name} !`)
            console.log(err);
        }
    }
}