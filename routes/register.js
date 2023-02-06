const express=require("express");
const credRoute=express.Router();
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
require('dotenv').config()
const {Usermodel}=require("../models/cred")
credRoute.post("/register",async(req,res)=>{
    try {
        const {name,mobile,Email,password}=req.body
        bcrypt.hash(password,5, async(err, hash)=>{
            if(err)
            {
               console.log("err in hashing"+err) 
            }else{
               const data= new Usermodel({name,mobile,Email,password:hash})
              await data.save();
              res.send("registered sucessfully")
            }
        });
    } catch (error) {
        res.send("error in registering")
    }
})
credRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
   try {
    
        const user=await Usermodel.findOne({email})
        if(user){
        bcrypt.compare(password, user.password, function(err, result) {
        if(result){
        const token = jwt.sign({userID:user._id},process.env.token,{expiresIn:"60s"});
        const refresh=jwt.sign({userID:user._id},process.env.secret,{expiresIn:"300s"});
        console.log(token+"\n"+"refreshtoken:\n"+refresh)
        res.send({"msg":"Login Successfull","token":token})
        } else {res.send("Wrong Credntials")}
        });
        } else {
        res.send("Wrong Credntials")
        }
        }
    catch (error) {
    res.send("Something went wrong")
console.log(err)

   }
})

module.exports={credRoute}

