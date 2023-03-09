const AddressSchema = require('../models/adresesSchema')
const ethers = require('ethers')
const {BuildIN,Token,Fiat,Custom} = require(`../lib/emogi`)
const { EmbedBuilder, Client} = require ("discord.js");
const {
API,
decimals,
} = require(`../lib/config`);
const guild_ID = process.env.GuildID_DEV
const {
wattToken, 
miningGame,
alt_wattToken,
alt_miningGame
} = require(`../lib/contracts`);
const alt_provider = new ethers.providers.JsonRpcProvider("https://rpc0.altcoinchain.org/rpc")
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")

const miningGameContract = new ethers.Contract(
    miningGame.address,
    miningGame.abi,
    provider);

const WattContract = new ethers.Contract(
    wattToken.address,
    wattToken.abi,
    provider);

const alt_watt_contract = new ethers.Contract(alt_wattToken.address,
    alt_wattToken.abi,
    alt_provider)

const alt_mininggame = new ethers.Contract(
    alt_miningGame.address,
    alt_miningGame.abi,
    alt_provider)


module.exports = { 
    name:"balance",
    async execute(interaction,client){
        await interaction.deferReply({ephemeral: true })
const response = await fetch(API.MATIC_Value)
    const data = await response.json();
    MATIC_Price = await (data.pair.priceUsd);
    
const response2 = await fetch(API.WATT_Value)
    const data2 = await response2.json();
    WATT_Price = await (data2.pair.priceUsd);

    const response3 = await fetch(API.ALT_Value)
    const data3 = await response3.json();
    ALT_Price = await (data3.primaryUsdValue);
if (!interaction.options.getUser("user")){

    let Check;
    try{
Check = await AddressSchema.findOne({userID: interaction.user.id})
}catch(err){console.log(err)}

  if(!Check){
    interaction.editReply({content:'Please Add your address with /address command ',ephemeral: true })
}
else if (Check){
    
    const OWN_WATT_Balance = (await WattContract.balanceOf(Check.adress)/ decimals);
    const OWN_MATIC_Balance = (await provider.getBalance(Check.adress) / decimals);
    const OWN_ALT_Balance = (await alt_provider.getBalance(Check.adress) / decimals);
    const OWN_REWARDS = await miningGameContract.getAllRewardsAmount(Check.adress);
    const ALT_OWN_WATT_Balance = (await alt_watt_contract.balanceOf(Check.adress) / decimals)
    const alt_wattRewards = ((await alt_mininggame.getAllRewardsAmount(Check.adress))[0] / decimals).toFixed(4);
    const OWN_NEWREWARDS = (OWN_REWARDS[0] / decimals).toFixed(4);
    const OWN_WATT_USD = (OWN_WATT_Balance * WATT_Price).toFixed(2);
    const OWN_MATIC_USD = (OWN_MATIC_Balance * MATIC_Price).toFixed(2);
    const OWN_ALT_USD = (OWN_ALT_Balance * ALT_Price) 
    const OWN_Total_Balnace = Number(OWN_WATT_USD)+Number(OWN_MATIC_USD)

const balancebanner = new EmbedBuilder()
.setColor(0xdfdf34)
.setImage(`https://cdn.discordapp.com/attachments/1078780922297598023/1079283193359908984/F334117B-0668-4E50-BE0A-784B2E006524.png`)
const altcoin_balance = new EmbedBuilder()
  .setAuthor({name:`Altcoin Network`,
  iconURL:'https://media.discordapp.net/attachments/1050912293317255228/1051161449285828638/AltcoinChain_logo.png',
  url:`http://expedition.altcoinchain.org/address/${Check.adress}`})
  .setColor(0xFFFAFA)
.addFields({
name:`__${Custom.Wallet}Wallet__`,
 
value:`${Token.ALT}__${OWN_ALT_Balance.toFixed(4)} ALT__ / ${Fiat.USD}${OWN_ALT_USD.toFixed(2)} USD
${Token.WATT}${OWN_WATT_Balance.toFixed(4)} WATT\n`,
inline: true},
  
{name:`__${BuildIN.Steak}Staking Rewards:__`,
value:`${Token.WATT}${alt_wattRewards} WATT `,inline: true})

const polygon_balance = new EmbedBuilder()
.setColor(0xA020F0)
.setAuthor({name:'Polygon Network',
iconURL:'https://cdn.discordapp.com/attachments/1078780922297598023/1079282443116351509/matic.png',
url:`https://polygonscan.com/address/${Check.adress}`})
.addFields({
name:`__${Custom.Wallet}Wallet__`,value:`${Token.MATIC} __${OWN_MATIC_Balance.toFixed(4)} MATIC__ / ${Fiat.USD}${OWN_MATIC_USD}USD\n ${Token.WATT} ${OWN_WATT_Balance.toFixed(4)} WATT /${Fiat.USD} ${OWN_WATT_USD} USD\n
*Balance of ${Fiat.USD} ${OWN_Total_Balnace.toFixed(2)} USD*`,inline: true},
 {name:`${BuildIN.Steak}__Staking Rewards:__`,value:`${Token.WATT}${OWN_NEWREWARDS} WATT / ${Fiat.USD}${(OWN_NEWREWARDS * WATT_Price).toFixed(2)} USD `,inline: true})
const finalembed = [balancebanner, altcoin_balance,polygon_balance]

interaction.editReply({embeds:finalembed
,ephemeral: true})
}
}

else if(interaction.options.getUser("user")){

    let Check2; 
    try {
    Check2 = await AddressSchema.findOne({userID: interaction.options.getUser("user").id})
    }catch(err){console.log(err)}

if(!Check2){
   await interaction.editReply({content:'This user have not registered their adress',ephemeral: true });
}
else if(Check2){
    
    
    const OTHER_WATT_Balance = (await WattContract.balanceOf(Check2.adress)/ decimals);
    const OTHER_MATIC_Balance = (await provider.getBalance(Check2.adress) / decimals);
    const OTHER_ALT_Balance = (await alt_provider.getBalance(Check2.adress) / decimals);
    const OTHER_REWARDS = await miningGameContract.getAllRewardsAmount(Check2.adress);
    const ALT_OTHER_WATT_Balance = (await alt_watt_contract.balanceOf(Check2.adress) / decimals)
    const OTHER_alt_wattRewards = ((await alt_mininggame.getAllRewardsAmount(Check2.adress))[0] / decimals).toFixed(4);
    const OTHER_NEWREWARDS = (OTHER_REWARDS[0] / decimals).toFixed(4);
    const OTHER_WATT_USD = (OTHER_WATT_Balance * WATT_Price).toFixed(2);
    const OTHER_MATIC_USD = (OTHER_MATIC_Balance * MATIC_Price).toFixed(2);
    const OTHER_ALT_USD = (OTHER_ALT_Balance * ALT_Price) 
    const OTHER_Total_Balnace = Number(OTHER_WATT_USD)+Number(OTHER_MATIC_USD)

    const user = client.users.cache.get(`${Check2.userID}`);
    const member = interaction.guild.members.cache.get(Check2.userID);
    const url = user.displayAvatarURL({ dynamic: true });
    const username = member.user.username;


const balancebanner = new EmbedBuilder()
.setColor(0xdfdf34)
.setAuthor({name:`@${username}'s Balance`,iconURL:url})
.setImage(`https://cdn.discordapp.com/attachments/1078780922297598023/1079283193359908984/F334117B-0668-4E50-BE0A-784B2E006524.png`)
// .setFooter({text:`${username}'s Balance`, iconURL:`${url}`})
const altcoin_balance = new EmbedBuilder()
  .setAuthor(
    {name:`Altcoin Network`,
    iconURL:'https://media.discordapp.net/attachments/1050912293317255228/1051161449285828638/AltcoinChain_logo.png',
    url:`http://expedition.altcoinchain.org/address/${Check2.adress}`
})   
    .setColor(0xFFFAFA)
//   .setTitle(`**${username}'s Balance**`)
.addFields(
    {name:`__${Custom.Wallet}Wallet__`,
value:`${Token.ALT}__${OTHER_ALT_Balance.toFixed(4)} ALT__ / ${Fiat.USD}${OTHER_ALT_USD.toFixed(2)} USD
${Token.WATT}${ALT_OTHER_WATT_Balance.toFixed(4)} WATT\n`,
inline: true},
  
{name:`__${BuildIN.Steak}Staking Rewards:__`,
value:`${Token.WATT}${OTHER_alt_wattRewards} WATT `,inline: true})

const polygon_balance = new EmbedBuilder()
.setColor(0xA020F0)

.setAuthor({name:'Polygon Network',
iconURL:'https://cdn.discordapp.com/attachments/1078780922297598023/1079282443116351509/matic.png',
url:`https://polygonscan.com/address/${Check2.adress}`})

.addFields({
name:`__${Custom.Wallet}Wallet__`,value:`${Token.MATIC} __${OTHER_MATIC_Balance.toFixed(4)} MATIC__ / ${Fiat.USD}${OTHER_MATIC_USD}USD\n ${Token.WATT} ${OTHER_WATT_Balance.toFixed(4)} WATT /${Fiat.USD} ${OTHER_WATT_USD} USD\n
*Balance of ${Fiat.USD} ${OTHER_Total_Balnace.toFixed(2)} USD*`,inline: true},
 {name:`${BuildIN.Steak}__Staking Rewards:__`,value:`${Token.WATT}${OTHER_NEWREWARDS} WATT / ${Fiat.USD}${(OTHER_NEWREWARDS * WATT_Price).toFixed(2)} USD `,inline: true}
)
const finalembed = [balancebanner, altcoin_balance,polygon_balance]

interaction.editReply({embeds:finalembed,ephemeral: true})
    }
}}
    }
