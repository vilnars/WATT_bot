const { Client, GatewayIntentBits } = require('discord.js');
require("dotenv").config();
const fs = require('fs');
const AddressSchema = require('./models/adresesSchema')
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Map();
const mongoose = require('mongoose')


fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  files.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  });
});
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MANGODB_URI,{
  keepAlive:true,
}).then(() => {
  console.log('Connected to DataBase')
})
});
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const commandName = interaction.commandName;
  const command = client.commands.get(commandName);
  if (!command) return;
  command.execute(interaction,client);
});

client.login(process.env.TOKEN);
