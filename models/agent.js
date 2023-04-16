const mongoose = require("mongoose");


const agencySchema = new mongoose.Schema({
    agent : {type:String},
    agency_id : {type:String}
})


const Agency = mongoose.model('Agency',agencySchema)

module.exports = Agency