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
    name: 'address',
    description: 'Register your address',
    options:[{
      name:'address',
      description:'Provide your matic adress ',
      type: 3,
      required:true,
    }]
  },
{
    name: 'inventory',
    description: 'Shows your staked',
    options:[{
      name:'user',
      description:'Shows Other users inventory',
      type: 6,
      required:false,
    }]
  },{
    name: 'top',
    description: 'Shows balance top of Owned NF',
    type: 1,
    options:[{
      name:"type",
      description:"Select one to see specified top",
      type:3,
      required:true,
      choices:[{
      name:"WATT",
      value:"watt",
    },{
      name:"Daily Rewards ",
      value:"d_rewards",
    },
    {
      name:"XL1",
      value:"xl1"
    },{
      name:"TX120",
      value:"tx120"
    },{
      name:"GP50",
      value:"gp50"
    },{
      name:"Genesis Badge",
      value:"badge"
    },

  ]}]
    
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.ClientID_BOT,
        process.env.GuildID_MINING
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
