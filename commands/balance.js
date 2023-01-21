const AddressSchema = require('../models/adresesSchema')
const ethers = require('ethers')

const {
API,
decimals,
} = require(`../lib/config`);

const {
wattToken, 
miningGame
} = require(`../lib/contracts`);

// iniciate Ether Contracts and Provider.
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
const miningGameContract = new ethers.Contract(miningGame.address, miningGame.abi, provider)
const WattContract = new ethers.Contract(wattToken.address, wattToken.abi,provider);




module.exports = { 
    name:"balance",
    async execute(interaction){
        await interaction.deferReply({ephemeral: true })

// console.log(interaction.options.getUser("user").id)
const response = await fetch(API.MATIC_Value)
    const data = await response.json();
    MATIC_Price = await (data.pair.priceUsd); // Stores Price in priceUSD
     //Gets WATT Token Price in USD
    const response2 = await fetch(API.WATT_Value)
    const data2 = await response2.json();
    WATT_Price = await (data2.pair.priceUsd);

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
    const OWN_REWARDS = await miningGameContract.getAllRewardsAmount(Check.adress);

    const OWN_NEWREWARDS = (OWN_REWARDS[0] / decimals).toFixed(4);
    const OWN_WATT_USD = (OWN_WATT_Balance * WATT_Price).toFixed(2);
    const OWN_MATIC_USD = (OWN_MATIC_Balance * MATIC_Price).toFixed(2);

    const OWN_Total_Balnace = Number(OWN_WATT_USD)+Number(OWN_MATIC_USD)
    
    interaction.editReply({content:`
:cut_of_meat:Staking Rewards::cut_of_meat:\n
<:watt:1061557096241442858>${OWN_NEWREWARDS} WATT / <:usd:1061731415756124201>${(OWN_NEWREWARDS * WATT_Price).toFixed(2)} USD \n
Wallet\n
<:matic:1061514190885494844> ${OWN_MATIC_Balance.toFixed(4)} MATIC / <:usd:1061731415756124201>${OWN_MATIC_USD} USD\n 
<:watt:1061557096241442858> ${OWN_WATT_Balance.toFixed(4)} WATT /<:usd:1061731415756124201> ${OWN_WATT_USD} USD\n 
Wallet Balance of <:usd:1061731415756124201> ${OWN_Total_Balnace.toFixed(2)} USD `,ephemeral: true})

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
    const OTHER_REWARDS = await miningGameContract.getAllRewardsAmount(Check2.adress);

    const OTHER_NEWREWARDS = (OTHER_REWARDS[0] / decimals).toFixed(4);
    const OTHER_WATT_USD = (OTHER_WATT_Balance * WATT_Price).toFixed(2);
    const OTHER_MATIC_USD = (OTHER_MATIC_Balance * MATIC_Price).toFixed(2);

    const OTHER_Total_Balnace = Number(OTHER_WATT_USD)+Number(OTHER_MATIC_USD)
   await interaction.editReply({content:`
   <@${Check2.userID}>'s Balance\n\n
                 :cut_of_meat:Staking Rewards::cut_of_meat:
<:watt:1061557096241442858>${OTHER_NEWREWARDS} WATT / <:usd:1061731415756124201>${(OTHER_NEWREWARDS * WATT_Price).toFixed(2)} USD\n
                          Wallet
<:matic:1061514190885494844> ${OTHER_MATIC_Balance.toFixed(4)} MATIC / <:usd:1061731415756124201>${OTHER_MATIC_USD} USD
<:watt:1061557096241442858> ${OTHER_WATT_Balance.toFixed(4)} WATT /<:usd:1061731415756124201> ${OTHER_WATT_USD} USD
Wallet Balance of <:usd:1061731415756124201> ${OTHER_Total_Balnace.toFixed(4)} USD `,ephemeral: true })
}}
    }
}
