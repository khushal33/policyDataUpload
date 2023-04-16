const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
    policy_mode: {type:String},
    producer: {type:String},
    policy_number: {type:String},
    premium_amount_written: {type:Number},
    premium_amount: {type:Number},
    policy_type: {type:String},
    policy_start_date: {type:Date},
    policy_end_date: {type:Date},
    csr: {type:String},
    carrier:{ type: mongoose.Schema.Types.ObjectId, ref: 'Carrier' },
    userAccount:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    agency : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

const Policy = mongoose.model('Policy',PolicySchema)

module.exports = Policy
