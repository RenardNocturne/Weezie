const { writeFile, readFileSync } = require("fs");
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
    name: "endSuggest",
    async execute (client, interaction) {
        const suggests = JSON.parse(readFileSync('./Utils/Data/suggests.json'));
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return  interaction.reply({content: "❌ Vous n'avez pas la permission requise !", ephemeral: true})
        
        const suggestID = interaction.customId.split("/").slice(1)[0];
        const suggestsMap = client.JSONToMap(suggests);
        const suggest = suggestsMap.get(suggestID);
        
        if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && Object.keys(suggest.hasVoted).includes(interaction.user.id)) {                    
            const msgFilter = m => m.author.id === interaction.user.id
            let response = "";
            
            const repEmbed = new MessageEmbed()
                .setTitle("📝 Répondre !")
                .setDescription("Quelle réponse souhaitez vous apporter ?")
                .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
                .setColor(client.config.colors.default)
            
            await interaction.reply({embeds: [repEmbed], fetchReply: true})
            .then(async msg => {
                await msg.channel.awaitMessages({filter: msgFilter, max: 1})
                .then(collected => {
                    response = collected.first().content
                    collected.first().delete().catch(err => client.error(err))
                    msg.delete().catch(err => client.error(err))
                })
            })

            const newEmbed = new MessageEmbed()
                .setAuthor("Suggestion !", interaction.guild.iconURL())
                .setDescription(`**📝 Contenu:** \n ${suggest.suggest} \n \n **📜 Réponse apportée:** \n ${response} \n \n ✅ **Approuvée à ${Math.round(suggest.opt1/suggest.total*100)}%** \n \n 🏳 **Neutre à ${Math.round(suggest.opt3/suggest.total*100)}%** \n \n ❌ **Déclinée à ${Math.round(suggest.opt2/suggest.total*100)}%** \n \n *${suggest.total} votes !*`)
                .setColor(Object.values(suggest.hasVoted)[Object.keys(suggest.hasVoted).indexOf(interaction.user.id)] === "1" ? client.config.colors.success : Object.values(suggest.hasVoted)[Object.keys(suggest.hasVoted).indexOf(interaction.user.id)] === "2" ? client.config.colors.error : "ffffff") //Oui c'est n'imp ALED !
                .setFooter(interaction.message.embeds[0].footer.text, interaction.message.embeds[0].footer.iconURL)
            interaction.message.edit({embeds: [newEmbed], components: []})

        } else if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            interaction.reply({content: "❌ Vous n'avez pas encore voté !", ephemeral: true})

        } else {
            interaction.reply({content: "❌ Vous n'avez pas la permission requise !", ephemeral: true})
        }

        suggestsMap.delete(suggestID);
        writeFile("./Utils/Data/suggests.json", client.mapToJSON(suggestsMap), err => {
            if (err) console.error(err)
            
        });
    }
}