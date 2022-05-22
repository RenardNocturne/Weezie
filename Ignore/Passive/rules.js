const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, Permissions, Message } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("rules")
            .setDescription("Renvoies les règles du serveur !"),
    async  execute(client, interaction) {
    const DevRules = new MessageAttachment('Images/DevRules.gif')
    const serverRules = new MessageAttachment("Images/serverRules.png")
    const important = new MessageAttachment("Images/important.png")

    const embed = new MessageEmbed()
        .setTitle(":wave: Bienvenue sur le serveur Discord CodingTime !")
        .setDescription(':bulb: **__Sur ce serveur, tu pourras trouver:__** \n > ◈ Des <@&922223564835414096> qui auront réponse à tes problèmes !\n > \n > ◈ Un salon <#922813260644896889> où tu pourras poster tes petites annonces et recruter un ou plusieurs <@&922223564835414096>.\n > \n > ◈ Des salons triés par langage de programmation pour ne pas t\'y perdre !\n > \n > ◈ Et bien plus encore...')
        .setImage('attachment://serverRules.png')
        .setColor(client.config.colors.default)

    const secondEmbed = new MessageEmbed()
    .setTitle(':gear: **Voici les règles à respecter**  :gear: ')    
    .setDescription(`
:x: **1.** **Ne pas spammer** (envoyer des messages à répétition) dans les salons textuels.
:x: **2.** Les **pubs** sous toutes formes sont **interdites** sans autorisation des <@&825764558093156372> ou <@&825764023504470047>, que ce soit en MP ou en public.
:x: **3.** Le **respect** entre chaque membre est **obligatoire** (toutes insultes seront sanctionnées).
:x: **4.** **Ne pas mentionner quiconque sans raison valable** ou pour des problèmes qui ne nous concernent pas ou que nous ne pouvons résoudre.
:x: **5.** Le **multi-compte** est **strictement interdit.**
:x: **6.** Toutes réactions visant à écrire des **insultes** seront **sanctionnées.**
:x: **7.** Le contenu **pornographique** est **interdit.**
:x: **8.** **L'usurpation d'identité** est formellement **interdite.**

:warning: **9.** *Chaque salon a son utilité veuillez la respecter en lisant sa description.*

:white_check_mark: **10.** **Bonne humeur et entraide sont les maîtres mots.**
        `)
        .setColor(client.config.colors.default)
        .setImage('attachment://important.png')

    const thirdEmbed = new MessageEmbed()
        .setTitle(':gear:  **Quelques infos pratiques** :gear:')
        .setDescription(`
> :warning: ***__Le non respect de l'une de ces règles pourrait vous conduire à un avertissement, une exclusion voir à un bannissement !__*** :warning: 
> 
> :tada: Si vous souhaitez **inviter des gens**, copiez [ce lien tout fait](https://discord.gg/YDa9BbNEtS) :tada:
> 
> - *Si vous avez __lu__ et __compris le règlement__ merci de cliquer sur le bouton "Accepter les règles !"*`)   
    .setColor(client.config.colors.default)
    .setFooter('Règles du serveur de ' + interaction.guild.name, interaction.guild.iconURL())
    .setImage('attachment://DevRules.gif')

    const row = new MessageActionRow()
        .addComponents([
            new MessageButton()
                .setLabel('Accepter les règles !')
                .setCustomId('accept_rules')
                .setStyle('SUCCESS'),
            
            new MessageButton()
                .setLabel("✋ Demander de l'aide !") 
                .setStyle("LINK")
                .setURL("https://canary.discord.com/channels/825760704241991752/931235192163668049")
        ])

    await interaction.channel.send({embeds: [embed], files: [serverRules]})
    await interaction.channel.send({embeds: [secondEmbed], files: [important]})
    await interaction.channel.send({embeds: [thirdEmbed], files: [DevRules], components: [row]})

    // client.channels.cache.get("825765662923423754").messages.fetch()
    // .then(messages => {
    //     messages.forEach(message => {
    //         console.log(message.embeds[0].description);
    //     })
    // })
},
userPerms: [Permissions.FLAGS.ADMINISTRATOR],
userPermsFR: ["Administrateur"]
}