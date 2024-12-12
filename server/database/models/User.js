const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    login: String,
    email: String,
    password: String,
    role: Boolean
   })
   const User = mongoose.model("User", userSchema)


module.exports = User;