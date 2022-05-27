const { Client, ButtonInteraction, MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "valid",
  /**
   * 
   * @param {Client} client 
   * @param {ButtonInteraction} interaction 
   */
  async execute (client, interaction) {
    if (!interaction.member.roles.cache.has(client.config.IDs.roles.mods)) return interaction.reply({ephemeral: true, content: `❌ Vous n'avez pas le rôle <@&${client.config.IDs.roles.mods}> !`});
    
    const args = interaction.customId.split("/").slice(1);
    const messageID = args[0];
    const channelID = args[1];
    
    const message = await client.channels.cache.get(channelID).messages.fetch(messageID).catch(err => console.log(err));
    
    message.reactions.cache.get("⏳").remove().catch(err => console.log(err));
    message.react('✅');

    !db.get(`${interaction.user.id}.verifs`) ? await db.set(`${interaction.user.id}.verifs`, 1) : await db.add(`${interaction.user.id}.verifs`, 1)

    const validatedEmbed = new MessageEmbed()
      .setAuthor(`Message accepté par ${interaction.user.username} !`, interaction.user.displayAvatarURL())
      .setDescription(`${interaction.message.embeds[0].description} \n \n **__🚀 Vérification :__** \n **✅ Message vérifié** par \`\`${interaction.user.username}\`\` / <@!${interaction.user.id}> qui réalise sa ${db.get(`${interaction.user.id}.verifs`) === 1 ? db.get(`${interaction.user.id}.verifs`) + "ère" : db.get(`${interaction.user.id}.verifs`) + "ème"} vérification !`)
      .setFooter( `Merci à ${interaction.user.username} pour la vérification !`,  interaction.user.displayAvatarURL())
      .setTimestamp()
      .setThumbnail('https://cdn.discordapp.com/attachments/871123050114998322/873311588172582952/image0.png')
      .setColor(client.config.colors.success);

    interaction.deferUpdate()
    interaction.message.delete().catch(err => console.log(err));
    client.channels.cache.get(client.config.IDs.channels.logs).send({embeds: [validatedEmbed]});

  }
}