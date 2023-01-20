require("dotenv").config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const commands = [
  {
    name: 'ping',
    description: 'Shows the latency of the Bot!',
  },
  {
    name: 'donate',
    description: 'Will display Donation Address if you want to support Bot creator',
  },
  {
    name: 'balance',
    description: 'Shows your balance, or ',
    options:[{
      name:'user',
      description:'shows an user balance ',
      type: 6,
      required:false,
    }]
  },
  {
    name: 'adress',
    description: 'Register your address',
    options:[{
      name:'adress',
      description:'Provide your matic adress ',
      type: 3,
      required:true,
    }]
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.ClientID_BOT,
        process.env.GuildID_DEV
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
