const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed, Message, Client, CommandInteraction } = require("discord.js");
const config = require("../../Utils/Data/config.json")
const { readFileSync, writeFile } = require("fs")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('🎁 Envoie un giveaway dans le salon giveaway !')
        .addSubcommand(message => message
            .setName("create")
            .setDescription("🧹 Créé un nouveau giveaway.")
            .addIntegerOption(option => option
                .setName("time")
                .setDescription("📌 Ajoute un timer au giveaway !")
                .addChoice('⏳ 1 Jour', 10)
                .addChoice('🎈 1 semaine', 24*60*60*7)
                .addChoice('🏮 2 semaines', 24*60*60*14)
                .addChoice("🚀 1 mois", 24*60*60*30)
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName("winner")
                .setDescription("📌 Ajoute un nombre de gagnant au giveaway !")
                .setRequired(true))
            .addStringOption(option => option
                .setName("récompense")
                .setDescription("📌 Ajoute une récompense !")
                .setRequired(true)
            )
        ),
    perms: [config.IDs.roles.admins],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    async execute (client, interaction) {
        const giveaways = JSON.parse(readFileSync('./Utils/Data/giveaways.json'));
        const giveawaysMap = client.JSONToMap(giveaways);
        
        const time = interaction.options.getInteger("time");
        const winner = interaction.options.getInteger("winner");
        const price = interaction.options.getString("récompense");

        giveawaysMap.set(interaction.id, {
            time: time,
            winner: winner,
            price: price,
            total: 0,
            
            hasVoted: [],
        }); 

        writeFile("./Utils/Data/giveaways.json", client.mapToJSON(giveawaysMap), err => {
            if (err) console.error(err)
        });

        const embed = new MessageEmbed()
            .setAuthor(`Nouveau giveaway !`, interaction.guild.iconURL())
            .setDescription(`⏳ Fin <t:${Math.round(Date.now()/1000 + time)}:R> \n\n 👤 Nombre de gagnants: \`${winner}\` \n\n 🎁 Récompense: \`${price}\``)
            .setFooter(`Aucun participant !`, interaction.user.displayAvatarURL()) 
            .setColor(client.config.colors.default);

        const row = new MessageActionRow() 
            .addComponents([
                new MessageButton()
                    .setLabel("🎁 Je participe !")
                    .setStyle("SUCCESS")
                    .setCustomId(`giveaway/${interaction.id}`),
                
                new MessageButton()
                    .setLabel("🚀 Terminer !")
                    .setStyle("PRIMARY")
                    .setCustomId(`endGiveaway/${interaction.id}`),
                
                new MessageButton()
                    .setLabel("🧨 Annuler !")
                    .setStyle("DANGER")
                    .setCustomId(`deleteGiveaway/${interaction.id}`)  
            ])

        client.channels.cache.get(config.IDs.channels.giveaways).send({content: `Notification pour <@&${config.IDs.roles.giveawaysNotifs}> !`,embeds: [embed], components: [row]})
        .then(msg => {
            interaction.reply({content: `✅ [Giveaway](${msg.url}) créé avec succès !`, ephemeral: true})
            client.emit("giveawayTimeout", interaction, time*1000, msg)
        })
    }
} 
