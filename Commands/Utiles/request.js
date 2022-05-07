const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
            .setName("request")
            .setDescription("📋 Crée ta requête !"),
    async execute (client, interaction) {

        const filter = m => m.author.id === interaction.user.id
        const componentFilter = i => i.user.id === interaction.user.id

        const infos = {
            description: "",
            abilities: [],
            price: "",
            finished: false
        }

        const baseRow = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("Annuler")
                    .setCustomId("cancelRequestCommand/" + interaction.user.id)
                    .setStyle("DANGER")
            ])

        const abilitiesRow = new MessageActionRow()
            .addComponents([
                new MessageSelectMenu()
                    .setCustomId("abilities")
                    .setPlaceholder("🧬 Besoin de...")
                    .setMaxValues(7)
                    
                    .addOptions([
                        {
                            label: 'Graphiste',
                            emoji: '🎨',
                            value: `${client.config.IDs.roles.graphists}`,
                            description: 'Pour les requêtes nécessitant un graphiste !'
                        },
                        {
                            label: 'Web Frontend',
                            emoji: '📜',
                            value: `${client.config.IDs.roles.frontend}`,
                            description: 'Pour les requêtes nécessitant un développeur Web Frontend !'
                        },
                        {
                            label: 'Web Backend',
                            emoji: '⚙',
                            value: `${client.config.IDs.roles.backend}`,
                            description: 'Pour les requêtes nécessitant un développeur Web Backend !'
                        },
                        {
                            label: 'JavaScript',
                            emoji: '<:JS:825850725183258624>',
                            value: `${client.config.IDs.roles.javascript}`,
                            description: 'Pour les requêtes nécessitant un développeur JavaScript !'
                        },
                        {
                            label: 'Python',
                            emoji: '<:Python:825853269607579648>',
                            value: `${client.config.IDs.roles.python}`,
                            description: 'Pour les requêtes nécessitant un développeur Python !'
                        },
                        {
                            label: 'Java/Kotlin',
                            emoji: '<:Java:835411957733130252>',
                            value: `${client.config.IDs.roles.java}`,
                            description: 'Pour les requêtes nécessitant un développeur Java/Kotlin !'
                        },
                        {
                            label: 'C/C++',
                            emoji: '<:C_:922511770873135194>',
                            value: `${client.config.IDs.roles.c}`,
                            description: 'Pour les requêtes nécessitant un développeur C/C++'
                        },
                        {
                            label: 'C#',
                            emoji: '<:csharp:835413910286237716>',
                            value: `${client.config.IDs.roles.csharp}`,
                            description: 'Pour les requêtes nécessitant un développeur C#'
                        },
                        {
                            label: 'Autres',
                            emoji: '📚',
                            value: `${client.config.IDs.roles.others}`,
                            description: 'Pour les requêtes nécessitant un développeur d\'un langage absent !'
                        },
                    ])
            ])
        const timesUpEmbed = new MessageEmbed()
            .setTitle("⏳ Temps écoulé !")
            .setColor(client.errorColor)
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())

        const descriptionEmbed = new MessageEmbed()
            .setAuthor("Requêtes", interaction.user.displayAvatarURL())
            .setDescription("Quelle description souhaitez vous ajouter à votre requête ? \n \n *Annulation dans 5 minutes !*")
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL()) //Oui demandée "ée" parce qu'on va dire que c'est la commande qui est demandée :3
            .setColor(client.defaultColor)

        const priceEmbed = new MessageEmbed() 
            .setAuthor("Requêtes", interaction.user.displayAvatarURL())
            .setDescription("Quelle récompense accorderez-vous ? \n \n *Annulation dans 1 minute !*")
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL()) 
            .setColor(client.defaultColor)

        const abilitiesEmbed = new MessageEmbed()
            .setAuthor("Requêtes", interaction.user.displayAvatarURL())
            .setDescription("Que nécessite votre requête ? \n \n *Annulation dans 1 minute !*")
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL()) 
            .setColor(client.defaultColor)
        
        let response;
        
        function TimesUp () {
            if (infos.finished) return
            interaction.deleteReply().catch(err => client.error(err))
                interaction.channel.send({embeds: [timesUpEmbed]})
                .then(msg => setTimeout(() => {
                    msg.delete().catch(err => client.error(err))
                }, 3500))
            infos.finished = true;
        }

        await interaction.reply({embeds: [descriptionEmbed], components: [baseRow], fetchReply: true})
        .then(async (resp) => {
            response = resp 

            await interaction.channel.awaitMessages({filter: filter, max: 1, time: 60000 * 5, errors: ['time']})
            .then(collected => {
                if (response.deleted) return
                collected = collected.first()
                infos.description = collected.content
                collected.delete().catch(err => client.error(err))
            })
            .catch(() => {
                TimesUp()
            })
        })

        if (response.deleted || infos.finished) return
        await interaction.editReply({embeds: [priceEmbed], components: [baseRow]})
        .then(async () => {
            await interaction.channel.awaitMessages({filter: filter, max: 1, time: 60000, errors: ['time']})
            .then(collected => {
                if (response.deleted) return
                collected = collected.first()
                infos.price = collected.content
                collected.delete().catch(err => client.error(err))
            })
            .catch(() => {
                TimesUp()
            })
        })

        if (response.deleted || infos.finished) return
        await interaction.editReply({embeds: [abilitiesEmbed], components: [abilitiesRow, baseRow], fetchReply: true})
        .then(async response => {
            await response.awaitMessageComponent({filter: componentFilter, time: "60000", errors: ['time']})
            .then(i => {
                if (response.deleted) return
                if (i.customId === "abilities") {
                    for (val of i.values) {
                        infos.abilities.push(`<@&${val}>`)
                    }
                } else {
                    infos.finished = true
                }
            })
            .catch(() => {
                TimesUp()
            })
        })

        const endEmbed = new MessageEmbed()
            .setAuthor(`Requête de ${interaction.user.tag}`, interaction.user.displayAvatarURL())
            .setDescription(`${infos.description} \n \n **🧬 Compétence.s requise.s:** \n > ${infos.abilities.join(', ')} \n \n **🎁 Récompense:** \n > ${infos.price}`)
            .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL()) 
            .setColor(client.defaultColor)

        const acceptedRequest = new MessageActionRow()
            .addComponents([
                new MessageButton()
                    .setLabel("Accepter !")
                    .setStyle("SUCCESS")
                    .setCustomId("acceptedRequest/" + interaction.user.id), //Pour pouvoir récup l'id de la personne qui a créé la request
                
                new MessageButton()
                    .setLabel("Annuler !")
                    .setCustomId("cancelRequest/" + interaction.user.id)
                    .setStyle("DANGER")
            ]) 
        if (infos.finished) return
        client.channels.cache.get(client.config.IDs.channels.requests).send({content: `Mention pour <@&${client.config.IDs.roles.devs}> !`, embeds: [endEmbed], components: [acceptedRequest]})
        .then(msg => {
            msg.startThread({name: `📋 Informations Complémentaires`})
        })
        interaction.editReply({content: `✅ Requête envoyée dans le salon <#${client.config.IDs.channels.requests}> !`, embeds: [], components: []})

        //Alors oui j'ai un peu spam les return mais aussi ils sont pas très clair dans la doc ^^'
    },
    userPerms: [],
    userPermsFR: []
}