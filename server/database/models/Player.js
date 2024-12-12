const mongoose = require("mongoose")
const User = require("./User.js");


const playerSchema = new mongoose.Schema({
    linkyt: String,
    category: String,
    like: [String],
    unlike: [String],
    countlike: Number,
    countunlike: Number
  })
   const PlayerYT = mongoose.model("PlayerYT", playerSchema)


module.exports = PlayerYT;