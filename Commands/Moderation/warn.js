const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, MessageEmbed } = require("discord.js");
const db = require('quick.db');
const config = require("../../Utils/Data/config.json")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("warn")
            .setDescription("β  GΓ¨re les avertissements d'un membre !")
            .addSubcommand(cmd => cmd
                .setName("add")
                .setDescription("β  Ajoute un warn Γ  un membre.")
                .addUserOption(option => option
                    .setName("membre")
                    .setDescription("π€ Choisissez un membre Γ  avertir.")
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName("raison")
                    .setDescription("π Indiquez une raison.")
                )
            )
            .addSubcommand(cmd => cmd
                .setName("remove")
                .setDescription("π₯ Retire un warn Γ  un membre.")
                .addUserOption(option => option
                    .setName("membre")
                    .setDescription("π€ Choisissez un membre.")
                    .setRequired(true)
                )
                .addNumberOption(option => option
                    .setName("nombre")
                    .setDescription("π₯ Nombre d'avertissements Γ  retirer.")
                )
            )
            .addSubcommand(cmd => cmd
                .setName("get")
                .setDescription("π Regardez les warns d'un membre.")
                .addUserOption(option => option
                    .setName("membre")
                    .setDescription("π€ Choisissez un membre.")
                    .setRequired(true)
                )
            ),
    perms: [config.IDs.roles.admins, config.IDs.roles.mods],
    async execute(client, interaction) {
        const cmd = interaction.options.getSubcommand();
        const mentionned = interaction.options.getMember("membre");
        const number = interaction.options.getNumber("nombre")
        let reason = "";
        if (interaction.options.getString("raison")) reason = `\n **Raison:** \n > ${interaction.options.getString("raison")}`;

        switch (cmd) {
            case "add":
                !db.get(`${mentionned.id}.warns`) ? await db.set(`${mentionned.id}.warns`, 1) : await db.add(`${mentionned.id}.warns`, 1 );

                const embed = new MessageEmbed()
                    .setAuthor(`${mentionned.user.tag} a Γ©tΓ© avertit !`, mentionned.user.displayAvatarURL())
                    .setDescription(`<@!${mentionned.id}> possΓ¨de **dΓ©sormais ${await db.get(`${mentionned.id}.warns`)} avertissements !** \n \n **ModΓ©rateur:** \n > <@!${interaction.user.id}> \n ${reason}`)
                    .setColor(client.config.colors.error)
                    .setFooter(`DemandΓ©e par ${interaction.member.displayName}`, interaction.member.displayAvatarURL())
                    .setTimestamp();
                
                interaction.reply({embeds: [embed]})
                break;

            case "remove":
                if (!db.get(`${mentionned.id}.warns`) || db.get(`${mentionned.id}.warns`) === 0) {
                    interaction.reply({content: "β L'utilisateur mentionnΓ© n'a aucun avertissement !", ephemeral: true});
                } else if (number > db.get(`${mentionned.id}.warns`)) {
                    interaction.reply({content: `β L'utilisateur mentionnΓ© a seulement ${db.get(`${mentionned.id}.warns`)} avertissement.s !`, ephemeral: true});
                } else {
                    const embed = new MessageEmbed()
                        .setAuthor(`${mentionned.user.tag} a perdu ${number ? number + "avertissement.s" : '1 avertissement'} !`, mentionned.user.displayAvatarURL())
                        .setDescription(`<@!${mentionned.id}> possΓ¨de **dΓ©sormais ${db.get(`${mentionned.id}.warns`) - (number ? number : 1)} avertissement.s !** \n \n **ModΓ©rateur:** \n > <@!${interaction.user.id}>`)
                        .setColor(client.config.colors.default)
                        .setFooter(`DemandΓ©e par ${interaction.member.displayName}`, interaction.member.displayAvatarURL())
                        .setTimestamp();
                    
                    interaction.reply({embeds: [embed]})
                    db.set(`${mentionned.id}.warns`, (db.get(`${mentionned.id}.warns`) - 1));
                }
                break;
            
            case "get":
                let warns;
                db.get(`${mentionned.id}.warns`) ? warns = db.get(`${mentionned.id}.warns`) : warns = 0
                
                const embed2 = new MessageEmbed()
                    .setAuthor(`Avertissements de ${mentionned.user.tag} !`, mentionned.user.displayAvatarURL())
                    .setDescription(`<@!${mentionned.id}> possΓ¨de **${warns} avertissement.s !**`)
                    .setColor(client.config.colors.default)
                    .setFooter(`DemandΓ©e par ${interaction.member.displayName}`, interaction.member.displayAvatarURL())
                    .setTimestamp();

                interaction.reply({embeds: [embed2]})
                break;

            default:
                break;
        }
    },
}