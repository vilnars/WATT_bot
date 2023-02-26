const {miningGame, miningGameNft,alt_miningGameNft,alt_miningGame} = require(`../lib/contracts`)
const ethers = require('ethers')
const AddressSchema = require('../models/adresesSchema')
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
const alt_provider = new ethers.providers.JsonRpcProvider("https://rpc0.altcoinchain.org/rpc")
const {NFT,BuildIN,Token,Custom} = require(`../lib/emogi`)


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
const alt_miningGameNftContract = new ethers.Contract(
    alt_miningGameNft.address,
    alt_miningGameNft.abi,
    alt_provider
)
const alt_miningGameContract = new ethers.Contract(
    alt_miningGame.address,
    alt_miningGame.abi,
    alt_provider
)
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
        const alt_inventory = []
        const inventory = []
        const Alt_StakedNFT = (await alt_miningGameContract.getActivityLogs(Check.adress)).filter((item)=>!item.isWithdrawn)
        const StakedNFT = (await miningGameContract.getActivityLogs(Check.adress)).filter((item) => !item.isWithdrawn)
      for (item of StakedNFT){
      inventory.push({
          tokenId:item.tokenId,
          amount:item.amount,
          ID:item.id,
      })};

      
      for (item of Alt_StakedNFT){
alt_inventory.push({
        tokenId:item.tokenId,
        amount:item.amount,
        ID:item.id,
})}
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
      let alt_NonStakedNFT = [];
      for (let i = 1; i <= 5; i++) {
          const alt_NotStakedNFT = await alt_miningGameNftContract.balanceOf(Check.adress, i);
          if (alt_NotStakedNFT > 0){  
              let name = tokenMap.get(i) || "unknown";
              alt_NonStakedNFT.push({
                  id:i,
                  name:name,
                  amount:alt_NotStakedNFT.toNumber()
              })
      }}
      let alt_nonstaked = [];
      let nonstaked = [];
      NonStakedNFT.forEach(item => nonstaked += `${item.name} x${item.amount}\n`);  
      alt_NonStakedNFT.forEach(item => alt_nonstaked += `${item.name} x ${item.amount}\n`)



      let InventoryString = ``;
      let Daily = 0;
      inventory.forEach(item => {
          let name = tokenMap.get(item.tokenId.toNumber()) || "unknown";
          let daily = rewardsMap.get(item.tokenId.toNumber()) || 0;
      
          Daily += daily * item.amount.toNumber();
          InventoryString += `${name} x${item.amount} \n`;
    
    
      })
      let alt_InventoryString = ``;
      let alt_Daily = 0
      alt_inventory.forEach(item =>{
        let alt_name = tokenMap.get(item.tokenId.toNumber()) || "unknown";
        let alt_daily = rewardsMap.get(item.tokenId.toNumber()) || 0;
      
        alt_Daily += alt_daily * item.amount.toNumber();
        alt_InventoryString += `${alt_name} x${item.amount} \n`;
      })
      interaction.editReply({
          content: `>>> ${Token.MATIC}**Polygon Network**${Token.MATIC}
          ${Custom.boxes}**Inventory:**${Custom.boxes}
${nonstaked}
**${BuildIN.Steak}Staked NFT'S:**${BuildIN.Steak}\n`
          +InventoryString +
                 `*Daily income: ${Token.WATT} ${Daily} WATT*\n
${Token.ALT}**Altcoin Network**${Token.ALT}
          ${Custom.boxes}**Inventory:**${Custom.boxes}
${alt_nonstaked}
${BuildIN.Steak}**Staked NFT'S:**${BuildIN.Steak}\n`
          +alt_InventoryString+`
*Daily income:${Token.WATT} ${alt_Daily} WATT*`,
          
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
    const alt_inventory = []
    const inventory = []
    const Alt_StakedNFT = (await alt_miningGameContract.getActivityLogs(Check2.adress)).filter((item)=>!item.isWithdrawn)
    const StakedNFT = (await miningGameContract.getActivityLogs(Check2.adress)).filter((item) => !item.isWithdrawn)
  for (item of StakedNFT){
  inventory.push({
      tokenId:item.tokenId,
      amount:item.amount,
      ID:item.id,
  })};

  
  for (item of Alt_StakedNFT){
alt_inventory.push({
    tokenId:item.tokenId,
    amount:item.amount,
    ID:item.id,
})}
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
  let alt_NonStakedNFT = [];
  for (let i = 1; i <= 5; i++) {
      const alt_NotStakedNFT = await alt_miningGameNftContract.balanceOf(Check2.adress, i);
      if (alt_NotStakedNFT > 0){  
          let name = tokenMap.get(i) || "unknown";
          alt_NonStakedNFT.push({
              id:i,
              name:name,
              amount:alt_NotStakedNFT.toNumber()
          })
  }}
  let alt_nonstaked = [];
  let nonstaked = [];
  NonStakedNFT.forEach(item => nonstaked += `${item.name} x${item.amount}\n`);  
  alt_NonStakedNFT.forEach(item => alt_nonstaked += `${item.name} x ${item.amount}\n`)



  let InventoryString = ``;
  let Daily = 0;
  inventory.forEach(item => {
      let name = tokenMap.get(item.tokenId.toNumber()) || "unknown";
      let daily = rewardsMap.get(item.tokenId.toNumber()) || 0;
  
      Daily += daily * item.amount.toNumber();
      InventoryString += `${name} x${item.amount} \n`;


  })
  let alt_InventoryString = ``;
  let alt_Daily = 0
  alt_inventory.forEach(item =>{
    let alt_name = tokenMap.get(item.tokenId.toNumber()) || "unknown";
    let alt_daily = rewardsMap.get(item.tokenId.toNumber()) || 0;
  
    alt_Daily += alt_daily * item.amount.toNumber();
    alt_InventoryString += `${alt_name} x${item.amount} \n`;
  })
  interaction.editReply({
      content: `${interaction.options.getUser("user")}'s \n
      >>> ${Token.MATIC}**Polygon Network**${Token.MATIC}
      ${Custom.boxes}**Inventory:**${Custom.boxes}
${nonstaked}
**${BuildIN.Steak}Staked NFT'S:**${BuildIN.Steak}\n`
      +InventoryString +
             `*Daily income: ${Token.WATT} ${Daily} WATT*\n
${Token.ALT}**Altcoin Network**${Token.ALT}
      ${Custom.boxes}**Inventory:**${Custom.boxes}
${alt_nonstaked}
${BuildIN.Steak}**Staked NFT'S:**${BuildIN.Steak}\n`
      +alt_InventoryString+`
*Daily income:${Token.WATT} ${alt_Daily} WATT*`,
      
      ephemeral: true })

}}}}
