const {miningGame} = require(`../lib/contracts`)
const ethers = require('ethers')
const stakingItems = [];
const publicKey = '0x185910726cE92DBFfB3938783166590304D822B2'

module.exports = {
    name:"inventory",
    async execute(interaction){
        await interaction.deferReply({ephemeral: true })
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
const tokenMap = new Map([
    [1,'Free mint Gaming PC'],
    [2,"Genesis Badge"],
    [3,"XL1 Processor"],
    [4,"TX120 GPU"],
    [5,"GP50 GPU"]
])
const rewardsMap = new Map([
    [1,0.25],
    [2,10.50],
    [3,2.25],
    [4,2.75],
    [5,4.50]
])
const miningGameContract = new ethers.Contract(
    miningGame.address,
    miningGame.abi,
    provider,)
const inventory = []

  const GetInfo = (await miningGameContract.getActivityLogs(publicKey)).filter((item) => !item.isWithdrawn)
for (item of GetInfo){
inventory.push({
    tokenId:item.tokenId,
    amount:item.amount,
})
}
let InventoryString = `>>> Your Staked NFT'S Are :\n\n`;
let Daily = 0;
inventory.forEach(item => {
    let name = tokenMap.get(item.tokenId.toNumber()) || "unknown";
    let daily = rewardsMap.get(item.tokenId.toNumber())|| 0;
    Daily += daily * item.amount.toNumber();
    InventoryString += `${name} x${item.amount} \n`
    
})

interaction.editReply({content: InventoryString +`\nDaily income: <:watt:1061557096241442858> ` + Daily + ` WATT`,ephemeral: true })
  }



    }
// }