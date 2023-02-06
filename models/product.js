const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    "metal":String,
    "userId":String,
    "price":Number,
    "Quantity":Number
})
const Productmodel=mongoose.model("userdata",userSchema);
module.exports={Productmodel}