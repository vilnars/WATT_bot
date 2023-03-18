const AddressSchema = require('../models/adresesSchema')
const {BuildIN} = require(`../lib/emogi`)
module.exports = {
    name:'register',
    async execute(interaction){
        let Profile_check 
        try {
            Profile_check = await AddressSchema.findOne({userID:interaction.user.id})
            if(Profile_check){
                interaction.reply({content:`${BuildIN.X}There is alredy an address for your username`,ephemeral: true })
            }else if(!Profile_check){
            let profile = await AddressSchema.create({
            userID:interaction.user.id,
            adress:interaction.options.get('address').value,
            LEVEL:"0",
            XP:"0",
        })
        interaction.reply({content:`you just added ${interaction.options.get('address').value} as your wallet adress`,ephemeral: true})
          profile.save();
    }
        }catch(err){console.log(err)}

        

        
        
    }
}
