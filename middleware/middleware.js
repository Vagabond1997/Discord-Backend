import {UserModel} from "../database/mydb.js";
import jwt from "jsonwebtoken";
const jwtProtected = async(req,res,next) => {
    //1st request ko heading token aako xa ki xaina check garney 
    // console.log(req.headers['authorization'])
    //first check authorization exist in request header
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         const bearerToken = req.headers.authorization.split(' ')[1]
         //get user with the token from users table and compare to bearetoken  i.e. database token ra bearer token match xa ki nae check garney by findOne 
         const authUser = await UserModel.findOne({ token: bearerToken}) 
         //xaina vaney chahi user not available 
         if(!authUser) {
            res.status(400).json({error:"User not available!"});
         }
         //verify jwt token with the user id
         let token = jwt.verify(bearerToken, process.env.SECRET_KEY);
        if(token) {
            req.user = authUser;
            next();
        }
     } else {
        res.status(400).json({error:"Authorization denied for this request!"});
     }
}

export{jwtProtected}