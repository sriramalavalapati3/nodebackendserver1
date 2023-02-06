const jwt=require("jsonwebtoken");
const fs=require("fs")
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    const blocklisted=JSON.parse(fs.readFileSync("blacklist.json",utf-8))
    try {
    if(token)
    {
        if(blocklisted.includes(token))
        {
            res.send("please login")
        }else{
            const decoded=jwt.verify(token,"Deva");
            console.log(decoded)
          
            if(decoded)
            {
                req.body.userId=decoded.userID
                next()
            }
        }
      
       
         
    }else{
        res.send("please login")
    }
   } catch (error) {
    res.send(error);
    console.log(error,'errorin authenctication middleware');
   }
}

module.exports={auth}
