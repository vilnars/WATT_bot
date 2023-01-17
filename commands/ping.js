module.exports = {
  name:'ping',
  execute(interaction) {
   interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms.`);
}}