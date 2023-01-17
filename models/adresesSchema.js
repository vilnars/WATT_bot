const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userID:{type:String, require:true},
    adress:{type:String,},
    WATT:{type:String, default:50},
    XP:{type:String,},
    LEVEL:{type:String}

})

const model = mongoose.model("Profile", AddressSchema);
module.exports = model;