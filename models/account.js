const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    account_name : {type:String , require : true},
    account_type : {type:String}
})


const Account = mongoose.model('Account',accountSchema)

module.exports = Account