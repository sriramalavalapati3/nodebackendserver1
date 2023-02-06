const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    "name":String,
    "Email":String,
    "mobile":Number,
    "password":String,
})
const Usermodel=mongoose.model("userdata",userSchema);
module.exports={Usermodel}