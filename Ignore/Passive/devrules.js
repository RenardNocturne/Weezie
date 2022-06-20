const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, Permissions, MessageSelectMenu } = require("discord.js")
const config = require("../../Utils/Data/config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("devrules")
        .setDescription("Renvoies les règles du serveur !"),
    perms: [config.IDs.roles.admins],
    async execute(client, interaction) {
    const DevRules = new MessageAttachment('Images/DevRules.gif')
    const serverRules = new MessageAttachment("Images/serverRules.png")
    const important = new MessageAttachment("Images/important.png")

    const embed = new MessageEmbed()
        .setAuthor('Mur des requêtes', interaction.guild.iconURL())
        .setDescription('💡 Cette catégorie permet aux membres du serveur de **recruter des développeurs ou des graphistes** pour leurs projets et aux développeurs et graphistes de faire leur **présentation** ! \n \n  ⚙ Pour ce faire, **postez vos requêtes dans le salon <#988175062223953989> grâce à la commande `/request` de <@!922239762797068299>** et attendez qu\'un développeur/graphiste réponde à votre appel en cliquant simplement sur le **bouton situé sous votre requête** ! \n \n Une fois le développeur/graphiste trouvé, un **ticket vous sera créé** et vous pourrez ainsi entamer votre projet ! 🚀')
        .setImage('attachment://serverRules.png')
        .setColor(client.config.colors.default)

    const secondEmbed = new MessageEmbed()
    .setTitle(':gear: **Voici les règles à respecter**  :gear: ')    
    .setDescription(`
> :x: **1.** Toute **arnaque ou tromperie** vous mènera à un **bannissement permanent**.
> :x: **2.** Nous ne participons qu'à la mise en relation **nous ne sommes pas responsables en cas d'arnaque ou de tromperie**.
> :x: **3.** **N'acceptez pas de requête** si vous savez que vous ne la **ferez pas**.
> 
> :white_check_mark: **4.** Merci de respecter une **orthographe correcte** lors de la description de votre requête.
> :white_check_mark: **5.** Essayer de **décrire au mieux** votre requête **sans faire la pub** de votre projet.
        `)
        .setColor(client.config.colors.default)
        .setImage('attachment://important.png')

    const thirdEmbed = new MessageEmbed()
        .setTitle(':gear:  **Quelques infos pratiques** :gear:')
        .setDescription(`
> :warning: ***__Le non respect de l'une de ces règles pourrait vous conduire à un avertissement, une exclusion voir à un bannissement !__*** :warning: 
>  
> :computer: Seules les personnes ayant le rôle <@&988175061099900988> ou <@&988175061099900987> peuvent accepter une requête, rôle uniquement accessible en acceptant ce règlement ! :computer:
> 
> - *En vous servant du menu déroulant ci-dessous, vous confirmez avoir accepté ce règlement !*`)   
    .setColor(client.config.colors.default)
    .setFooter('Règles du serveur de ' + interaction.guild.name, interaction.guild.iconURL())
    .setImage('attachment://DevRules.gif')

    const row = new MessageActionRow()
        .addComponents([
            new MessageSelectMenu()
                .setPlaceholder("🧬 Choisissez vos rôles !")
                .setMaxValues(2)
                .setCustomId("autoroles/3")
                .addOptions([
                    {
                        label: 'Développeur',
                        value: `${client.config.IDs.roles.devs}`,
                        description: "Obtenez le rôle développeur !",
                        emoji: "💻"
                    },
                    {
                        label: 'Graphiste',
                        value: `${client.config.IDs.roles.graphistes}`,
                        description: "Obtenez le rôle graphiste !",
                        emoji: "🎨"
                    },
                ])
        ])

    await interaction.channel.send({embeds: [embed], files: [serverRules]})
    await interaction.channel.send({embeds: [secondEmbed], files: [important]})
    await interaction.channel.send({embeds: [thirdEmbed], files: [DevRules], components: [row]})
},
userPerms: [Permissions.FLAGS.ADMINISTRATOR],
userPermsFR: ["Administrateur"]
}