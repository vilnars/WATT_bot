const AddressSchema = require('../models/adresesSchema')
const ethers = require('ethers')
const {NFT,BuildIN,Token,Fiat,Custom} = require(`../lib/emogi`)
const {
API,
decimals,
} = require(`../lib/config`);

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
    async execute(interaction){
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
    
    interaction.editReply({content:`
    ${Token.MATIC}**Polygon Network**${Token.MATIC}\n 
${Custom.Wallet}Wallet${Custom.Wallet}
${Token.MATIC} ${OWN_MATIC_Balance.toFixed(4)} MATIC / ${Fiat.USD}${OWN_MATIC_USD} USD
${Token.WATT} ${OWN_WATT_Balance.toFixed(4)} WATT /${Fiat.USD} ${OWN_WATT_USD} USD
${Custom.Wallet} Balance of ${Fiat.USD} ${OWN_Total_Balnace.toFixed(2)} USD \n
${BuildIN.Steak}Staking Rewards:${BuildIN.Steak}
${Token.WATT}${OWN_NEWREWARDS} WATT / ${Fiat.USD}${(OWN_NEWREWARDS * WATT_Price).toFixed(2)} USD \n
\n${Token.ALT}**Altcoin Chain**${Token.ALT}\n
${Custom.Wallet}Wallet${Custom.Wallet}
${Token.ALT}${OWN_ALT_Balance.toFixed(4)} ALT / ${Fiat.USD}${OWN_ALT_USD.toFixed(2)}USD
${Token.WATT}${ALT_OWN_WATT_Balance.toFixed(4)} WATT\n
${BuildIN.Steak}Staking Rewards:${BuildIN.Steak}
${Token.WATT}${alt_wattRewards}WATT`
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
    const OTHER_REWARDS = ((await miningGameContract.getAllRewardsAmount(Check2.adress))[0] / decimals).toFixed(4); // Gives out Earned Rewards  

    // const ALT_OTHER_WATT_Balance = (await alt_watt_contract.balanceOf(Check2.adress) / decimals)
    const ALT_OTHER_WATT_Balance = (await alt_watt_contract.balanceOf(Check2.adress) / decimals)
    const alt_wattRewards = ((await alt_mininggame.getAllRewardsAmount(Check2.adress))[0] / decimals).toFixed(4);
    const OTHER_WATT_USD = (OTHER_WATT_Balance * WATT_Price).toFixed(2); //Gives nummbers  for Target user Wat USD Value fixed to 2 decimals (Pollygon network)
    const OTHER_MATIC_USD = (OTHER_MATIC_Balance * MATIC_Price).toFixed(2); // Gives Nummbers For Target user Matic value 
    const OTHER_ALT_USD = (OTHER_ALT_Balance* ALT_Price).toFixed(2)
    const OTHER_Total_Balnace = Number(OTHER_WATT_USD)+Number(OTHER_MATIC_USD)
    
   await interaction.editReply({content:`
    <@${Check2.userID}>**'s Balance**\n
    ${Token.MATIC}**Polygon Network**${Token.MATIC}\n 
    ${Custom.Wallet}Wallet${Custom.Wallet}
    ${Token.MATIC} ${OTHER_MATIC_Balance.toFixed(4)} MATIC / ${Fiat.USD}${OTHER_MATIC_USD} USD
    ${Token.WATT} ${OTHER_WATT_Balance.toFixed(4)} WATT /${Fiat.USD}${OTHER_WATT_USD} USD\n
    ${Custom.Wallet} Wallet Balance of ${Fiat.USD} ${OTHER_Total_Balnace.toFixed(2)} USD \n
    ${BuildIN.Steak}Staking Rewards:${BuildIN.Steak}
    ${Token.WATT}${OTHER_REWARDS} WATT / ${Fiat.USD}${(OTHER_REWARDS * WATT_Price).toFixed(2)} USD\n
    ${Token.ALT}**Altcoin Chain**${Token.ALT}\n
    ${Custom.Wallet}Wallet${Custom.Wallet}
    ${Token.ALT}${OTHER_ALT_Balance.toFixed(4)}ALT / ${Fiat.USD}${OTHER_ALT_USD} USD
    ${Token.WATT}${ALT_OTHER_WATT_Balance.toFixed(4)} WATT\n
    ${BuildIN.Steak}Staking Rewards:${BuildIN.Steak}
    ${Token.WATT}${alt_wattRewards}WATT
`,ephemeral: true })

}}
    }
}
