const mongoose = require("mongoose");

const CarrierSchema = new mongoose.Schema({
    company_name: {type:String},
    lob:{ type: mongoose.Schema.Types.ObjectId, ref: 'LOB' },
  });

const Carrier = mongoose.model('Carrier',CarrierSchema)

module.exports = Carrier