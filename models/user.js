const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true , require:true},
    userType:{type:String},
    firstName:{type:String},
    city:{type:String},
    phone:{type:String},
    address:{type:String},
    state:{type:String},
    zip:{type:String},
    dob:{type:String}
})


const User = mongoose.model('User',userSchema)

module.exports = User