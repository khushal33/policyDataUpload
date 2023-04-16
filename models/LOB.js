const mongoose = require("mongoose");

const LOBSchema = new mongoose.Schema({
    category_name: {type:String}
  });

const LOB = mongoose.model('LOB',LOBSchema)

module.exports = LOB