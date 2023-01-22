const AddressSchema = require('../models/adresesSchema')
const ethers = require('ethers');
const balance = require('./balance');
const { decimals } = require('../lib/config');
const test1 = "0x185910726cE92DBFfB3938783166590304D822B2";
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
const {BuildIN, Token, NFT} = require('../lib/emogi')
const {wattToken, miningGame,miningGameNft} = require(`../lib/contracts`)
const WattContract = new ethers.Contract(
    wattToken.address,
    wattToken.abi,
    provider);
const miningGameContract = new ethers.Contract(
    miningGame.address,
    miningGame.abi,
    provider);
const miningGameNftContract = new ethers.Contract(
    miningGameNft.address,
    miningGameNft.abi,
    provider)

    const rewardsMap = new Map([
        [1,0.25],
        [2,10.50],
        [3,2.25],
        [4,2.75],
        [5,4.50]
    ]);


module.exports = {
    name:'top',
    async execute(interaction){
        await interaction.deferReply({ephemeral: true })

        if (interaction.options.getString('type') === "watt") {
            AddressSchema.find({adress: {$ne: null}}, async (err, users) => {
                if(err) console.log(err);
                let addresses = users.map(user => user.adress);
                let userID = users.map(user => user.userID);
    
            
                let balance = []
                for(const id of userID) {
                    let bal = (await WattContract.balanceOf(addresses[userID.indexOf(id)])/ decimals).toFixed(4);
                    balance.push({userID: `<@${id}>`, balance: bal});
                }
                balance.sort((a, b)=> b.balance - a.balance);
                let message =  ``
                let counter = 1;
                for(const b of balance) {
                    message += `${counter} ${b.userID}      ${Token.WATT} ${b.balance} WATT`+ `\n`;
                    counter ++;
                }
                interaction.editReply({content:`**Balance Top For WATT Token in Wallet \n**${message}`,ephemeral: true })
             });      

        }else if (interaction.options.getString('type') ==="d_rewards"){
            let rewards =[]
            AddressSchema.find({adress: {$ne: null}}, async (err, users) => {
                if(err) console.log(err);
                for(const user of users) {
                    let address = user.adress;
                    let activityLogs = (await miningGameContract.getActivityLogs(address)).filter((item) => !item.isWithdrawn);
                    let userRewards = 0;
                    activityLogs.forEach(item => {
                            let reward = rewardsMap.get(item.tokenId.toNumber()) || 0;
                            userRewards += reward * item.amount.toNumber();
                        });
                        rewards.push({
                            userid:user.userID,
                            daily:userRewards
                        });
                }
                rewards.sort((a, b) => b.daily - a.daily);
                let message = ``;
                rewards.forEach((reward, index) => {
                    message += `${index + 1}. <@${reward.userid}>  ${reward.daily}${Token.WATT}\n`;
                });
                interaction.editReply({content:`**Daily Rewards Top** \n${message}`})
            });

        
        }else if (interaction.options.getString('type') ==="xl1"){

            AddressSchema.find({adress: {$ne: null}}, async (err, users) => {
                if(err) console.log(err);
                let amount = [];
                for(const user of users) {
                    let address = user.adress;
                    let StakedNFT = (await miningGameContract.getActivityLogs(address)).filter((item) => !item.isWithdrawn && (item.tokenId).toNumber() === 3);
                    let ammount = 0;
                    for (item of StakedNFT){
                        ammount += item.amount.toNumber();
                    }
                    let balance = (await miningGameNftContract.balanceOf(address, 3)).toNumber();
                    ammount += balance;
                    if(ammount > 0) amount.push({userId: user.userID, ammount: ammount});
                }
                amount.sort((a, b) => b.ammount - a.ammount);
                let message = "";
                let counter = 1;
                for (const item of amount) {
                    message += `**${counter}.** <@${item.userId}>  **${item.ammount}**${NFT.XL1}\n`;
                    counter++;
                }
            // console.log(balance)
            interaction.editReply({content:`*NFT* **XL1** Top\n ${message}`, ephemeral: true});
            });

        }else if (interaction.options.getString('type') ==="tx120"){
            AddressSchema.find({adress: {$ne: null}}, async (err, users) => {
                if(err) console.log(err);
                let amount = [];
                for(const user of users) {
                    let address = user.adress;
                    let StakedNFT = (await miningGameContract.getActivityLogs(address)).filter((item) => !item.isWithdrawn && (item.tokenId).toNumber() === 4);
                    let ammount = 0;
                    for (item of StakedNFT){
                        ammount += item.amount.toNumber();
                    }
                    let balance = (await miningGameNftContract.balanceOf(address, 4)).toNumber();
                    ammount += balance;
                    if(ammount > 0) amount.push({userId: user.userID, ammount: ammount});
                }
                amount.sort((a, b) => b.ammount - a.ammount);
                let message = "";
                let counter = 1;
                for (const item of amount) {
                    message += `**${counter}.** <@${item.userId}>  ${item.ammount}${NFT.TX120}\n`;
                    counter++;
                }
            interaction.editReply({content:`*NFT* **TX120** Top\n ${message}`, ephemeral: true});
            });
        }else if (interaction.options.getString('type') ==="gp50"){
            AddressSchema.find({adress: {$ne: null}}, async (err, users) => {
                if(err) console.log(err);
                let amount = [];
                for(const user of users) {
                    let address = user.adress;
                    let StakedNFT = (await miningGameContract.getActivityLogs(address)).filter((item) => !item.isWithdrawn && (item.tokenId).toNumber() === 5);
                    let ammount = 0;
                    for (item of StakedNFT){
                        ammount += item.amount.toNumber();
                    }
                    let balance = (await miningGameNftContract.balanceOf(address, 5)).toNumber();
                    ammount += balance;
                    if(ammount > 0) amount.push({userId: user.userID, ammount: ammount});
                }
                amount.sort((a, b) => b.ammount - a.ammount);
                let message = "";
                let counter = 1;
                for (const item of amount) {
                    message += `**${counter}.** <@${item.userId}>  ${item.ammount}${NFT.GP50}\n`;
                    counter++;
                }
            interaction.editReply({content:`*NFT* **GP50** Top\n ${message}`, ephemeral: true});
            });
        }else if (interaction.options.getString('type') ==="badge"){
            AddressSchema.find({adress: {$ne: null}}, async (err, users) => {
                if(err) console.log(err);
                let amount = [];
                for(const user of users) {
                    let address = user.adress;
                    let StakedNFT = (await miningGameContract.getActivityLogs(address)).filter((item) => !item.isWithdrawn && (item.tokenId).toNumber() === 2);
                    let ammount = 0;
                    for (item of StakedNFT){
                        ammount += item.amount.toNumber();
                    }
                    let balance = (await miningGameNftContract.balanceOf(address, 2)).toNumber();
                    ammount += balance;
                    if(ammount > 0) amount.push({userId: user.userID, ammount: ammount});
                }
                amount.sort((a, b) => b.ammount - a.ammount);
                let message = "";
                let counter = 1;
                for (const item of amount) {
                    message += `**${counter}.** <@${item.userId}>  ${item.ammount}${NFT.Badge}\n`;
                    counter++;
                }
            interaction.editReply({content:`*NFT* **Genesis Badge** Top\n ${message}`, ephemeral: true});
            });
        }




        
        
    }
}