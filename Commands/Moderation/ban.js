const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../Utils/Data/config.json")
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
            .setName("ban")
            .setDescription("🔨 Bannit un membre.")
            .addUserOption(option => option
                .setName("membre")
                .setDescription('👤 Membre à bannir.')
                .setRequired(true))
            .addStringOption(option => option
                .setName("durée")
                .setDescription("⏳ Choisissez la durée du bannissement.")
                .addChoice("🕳 Permanent", "permanent")
                .addChoice("⏳ 1 jour", "day")
                .addChoice("🩹 Trois jours", "days")
                .addChoice("⚠ Une semaine", "week")
                .addChoice("🔥 1 mois", "month")
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName("raison")
                .setDescription("📝 Indiquez une raison au bannissement.")),
    perms: [config.IDs.roles.admins, config.IDs.roles.mods],
    async execute(client, interaction) {
        const target = interaction.options.getMember("membre").user
        const time = interaction.options.getString("durée")
        const reason = interaction.options.getString("raison") ? `\n \n *__📝 Raison:__* \n > ${interaction.options.getString("raison")}` : ""

        async function ban (duration, txt, perm) {
            const unbanEmbed = new MessageEmbed()
                .setAuthor(`${target.tag} débannit !`, target.displayAvatarURL())
                .setDescription(`*__👤 Modérateur:__* \n > <@!${interaction.user.id}> ${reason} \n \n *__⏳ Durée:__* \n > ${txt}`)
                .setColor(client.config.colors.default)
                .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
                .setTimestamp();

            const banEmbed = new MessageEmbed()
                .setAuthor(`${target.tag} bannit !`, target.displayAvatarURL())
                .setDescription(`*__👤 Modérateur:__* \n > <@!${interaction.user.id}> ${reason} \n \n *__⏳ Durée:__* \n > ${txt}`)
                .setColor(client.config.colors.default)
                .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
                .setTimestamp();

            const infoEmbed = new MessageEmbed()
                .setAuthor(`Vous avez été bannit de ${interaction.guild.name} !`, interaction.guild.iconURL())
                .setDescription(`*__👤 Modérateur:__* \n > \`\`${interaction.user.tag}\`\` ${reason} \n \n *__⏳ Durée:__* \n > ${txt}`)
                .setColor(client.config.colors.default)
                .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
                .setTimestamp();

            const infoUnbanEmbed = new MessageEmbed()
                .setAuthor(`Vous avez été débannit de ${interaction.guild.name} !`, interaction.guild.iconURL())
                .setDescription(`*__👤 Modérateur:__* \n > \`\`${interaction.user.tag}\`\` ${reason} \n \n *__⏳ Durée:__* \n > ${txt}`)
                .setColor(client.config.colors.default)
                .setFooter(`Demandée par ${interaction.user.username}`, interaction.user.displayAvatarURL())
                .setTimestamp();

            
            if (!perm) {
                setTimeout(() => {
                    client.channels.cache.get(client.config.IDs.channels.sanctions).send({embeds: [unbanEmbed]})
                    interaction.guild.members.unban(target.id).catch(err => client.error(err))
                    target.send({embeds: [infoUnbanEmbed]}).catch(err => client.error(err))
                }, 86400 * 1000 * duration );
            }
            
            target.send({embeds: [infoEmbed]}).catch(err => client.error(err)) 
            await interaction.guild.members.ban(target.id).catch(err => client.error(err))
            interaction.reply({embeds: [banEmbed], components: []})
        }

        switch (time) {
            case 'day':
                ban(1, '1 jour')
                break;
            case 'days':
                ban(3, '3 jours')
                break;
            case 'week':
                ban(7, '1 semaine')
                break;
            case 'month':
                ban(31, '1 mois')
                break;
            case 'permanent':
                ban(undefined, 'Permanent', true)
            default:
                break;
        }   
    },
}               