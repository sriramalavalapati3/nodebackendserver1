const express=require("express");
const app=express();
const fs=require("fs")
app.use(express.json());
const {auth}=require("./middlewares/jwt.middlewares")
require('dotenv').config()
const {connection}=require("./config/config");
const {credRoute}=require("./routes/register")
app.use("/cred",credRoute);
// app.use("/user",auth,RegisterRoute)
app.post("/logout",async(req,res)=>{
    const token=req.headers.authorization;
    const blocklisted=JSON.parse(fs.readFileSync("blacklist.json","utf-8"))
    blocklisted.push(token);
    fs.writeFileSync("blacklist.json",JSON.stringify(blocklisted))
    res.send("logout sucesfully")
    })
    app.get("/getnewtoken", (req, res) => {
        const refreshtoken = req.headers.authorization
    
        if(!refreshtoken){
            res.send("login again")
        }
        jwt.verify(refreshtoken,process.env.secret, function(err, decoded) {
            if(err){
                res.send({"message" : "plz login first", "err" : err.message})
            }
            else{
                const token = jwt.sign({userID : decoded.userID}, "NORMAL_SECRET", {expiresIn :"60s"})
                res.send({msg : "login successfull", token})
            }
      });
    })
app.listen(process.env.port,async(req,res)=>{
    try {
        await connection;
        console.log("db connected\nserver running at port no "+`${process.env.port}`)
    } catch (error) {
       console.log(error.message+"error in connecting server") 
    }
})