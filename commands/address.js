const AddressSchema = require('../models/adresesSchema')

module.exports = {
    name:'address',
    async execute(interaction){
        let Profile_check 
        try {
            Profile_check = await AddressSchema.findOne({userID:interaction.user.id})
            if(Profile_check){
                interaction.reply(`You alredy have registred your adress`)
            }else if(!Profile_check){
            let profile = await AddressSchema.create({
            userID:interaction.user.id,
            adress:interaction.options.get('address').value,
            LEVEL:"0",
            XP:"0",
        })
        interaction.reply(`you just added ${interaction.options.get('address').value} as your wallet adress`)
          profile.save();
    }
        }catch(err){console.log(err)}

        

        
        
    }
}