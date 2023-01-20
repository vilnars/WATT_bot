const {miningGame, miningGameNft} = require(`../lib/contracts`)
const ethers = require('ethers')
const AddressSchema = require('../models/adresesSchema')
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
const publicKey = '0x4B6123e6811C27558B5cb96b847B2f22B247bf25'
const {NFT,Fiat,Token} = require(`../lib/emogi`)


const tokenMap = new Map([
    [1,`${NFT.freepc}*Free Gaming PC*`],
    [2,`${NFT.Badge}*Genesis Badge*`],
    [3,`${NFT.XL1}*XL1 Processor*`],
    [4,`${NFT.TX120}*TX120 GPU*`],
    [5,`${NFT.GP50}*GP50 GPU*`]
]);

const rewardsMap = new Map([
    [1,0.25],
    [2,10.50],
    [3,2.25],
    [4,2.75],
    [5,4.50]
]);

const miningGameContract = new ethers.Contract(
    miningGame.address,
    miningGame.abi,
    provider,)

const miningGameNftContract = new ethers.Contract(
    miningGameNft.address,
    miningGameNft.abi,
    provider,)

module.exports = {
    name:"inventory",
    async execute(interaction){
await interaction.deferReply({ephemeral: true })

if (!interaction.options.getUser("user")){
let Check;
    try{
Check = await AddressSchema.findOne({userID: interaction.user.id})
}catch(err){console.log(err)}
if(!Check){
    interaction.editReply({content:`${BuildIN.X}Please Add your address with /address command `,ephemeral: true })}
    if(Check){
        const inventory = []
        const StakedNFT = (await miningGameContract.getActivityLogs(Check.adress)).filter((item) => !item.isWithdrawn,)
      for (item of StakedNFT){
      inventory.push({
          tokenId:item.tokenId,
          amount:item.amount,
          ID:item.id,
      })};
      let NonStakedNFT = [];
      for (let i = 1; i <= 5; i++) {
          const NotStakedNFT = await miningGameNftContract.balanceOf(Check.adress, i);
          if (NotStakedNFT > 0){
              let name = tokenMap.get(i) || "unknown";
              NonStakedNFT.push({
                  id:i,
                  name:name,
                  amount:NotStakedNFT.toNumber()
              })
      }}
      
      
      let InventoryString = ``;
      let Daily = 0;
      inventory.forEach(item => {
          let name = tokenMap.get(item.tokenId.toNumber()) || "unknown";
          let daily = rewardsMap.get(item.tokenId.toNumber()) || 0;
      
          Daily += daily * item.amount.toNumber();
          InventoryString += `${name} x${item.amount} \n`;
          
      })
      let Nonstaked = [];
      NonStakedNFT.forEach(item => Nonstaked += `${item.name} x${item.amount}\n`);
      
      
      interaction.editReply({
          content: `>>> **Inventory** \n${Nonstaked}`+ `\n **Staked NFT'S:**\n\n` + InventoryString +
          `\n**Daily income:** 
          ${Token.WATT} ` + Daily + ` WATT`  ,
          
          ephemeral: true })
    }
}

else if(interaction.options.getUser("user")){
    let Check2; 
    try {
    Check2 = await AddressSchema.findOne({userID: interaction.options.getUser("user").id})
    }catch(err){console.log(err)}

if(!Check2){
   await interaction.editReply({content:`${BuildIN.X}*This user have not registered their adress*`,ephemeral: true });
}
else if(Check2){
    const inventory = []
    const StakedNFT = (await miningGameContract.getActivityLogs(Check2.adress)).filter((item) => !item.isWithdrawn,)
  for (item of StakedNFT){
  inventory.push({
      tokenId:item.tokenId,
      amount:item.amount,
      ID:item.id,
  })};
  let NonStakedNFT = [];
  for (let i = 1; i <= 5; i++) {
      const NotStakedNFT = await miningGameNftContract.balanceOf(Check2.adress, i);
      if (NotStakedNFT > 0){
          let name = tokenMap.get(i) || "unknown";
          NonStakedNFT.push({
              id:i,
              name:name,
              amount:NotStakedNFT.toNumber()
          })
  }}
  
  
  let InventoryString = ``;
  let Daily = 0;
  inventory.forEach(item => {
      let name = tokenMap.get(item.tokenId.toNumber()) || "unknown";
      let daily = rewardsMap.get(item.tokenId.toNumber()) || 0;
  
      Daily += daily * item.amount.toNumber();
      InventoryString += `${name} x${item.amount} \n`;
      
  })
  let Nonstaked = [];
  NonStakedNFT.forEach(item => Nonstaked += `${item.name} x${item.amount}\n`);
  
  
  interaction.editReply({
      content: ``${interaction.options.getUser("user")}'s \n>>> **Inventory** \n${Nonstaked}`+ `\n **Staked NFT'S:**\n\n` + InventoryString +
      `\n**Daily income:** 
      ${Token.WATT} ` + Daily + ` WATT`  ,
      
      ephemeral: true })
}


}





  }



    }
