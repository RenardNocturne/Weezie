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
        }
    } else if (interaction.isButton()) {
        const commandName = interaction.customId.split("/")[0]
        const command = client.buttons.get(commandName);
        console.log(client.buttons);
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
        // switch (interaction.customId.split("/")[0]) {
        //     case "accept_rules":
        //         client.emit("rules", interaction) 
        //         break;
        //     case "acceptDevRules":
        //         client.emit("devRules", interaction)
        //         break;
        //     case "cancelRecruit":
        //         interaction.message.delete().catch(err => console.log(err))
        //         break;
        //     case "acceptedRequest":
        //         client.emit("acceptedRequest", interaction)
        //         break;
        //     case "cancelRequest":
        //         client.emit("cancelRequest", interaction)
        //         break;
        //     case "requestFinished":
        //         client.emit("requestFinished", interaction)
        // }
    }
}