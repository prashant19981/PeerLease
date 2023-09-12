import Users from "../models/Users.js"
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
export const registerUser = async (req,res,next) =>{
    try{
        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        })
        await newUser.save();
        res.status(200).send("User is registered")
    }
    catch(e){
        
    }

}
export const loginUser = async (req,res,next) =>{

    try{
        const user = await Users.findOne({email: req.body.email})
        const saltRounds = 10;
       
        if(user != null){
            console.log(user.password,req.body.password);
            const passwordValidation = await bcryptjs.compare(req.body.password,user.password);
            console.log(passwordValidation);
            if(passwordValidation){
                const token = jwt.sign({id:user._id,name:user.name},process.env.JWT_KEY);
                res.cookie("access_token",token,{
                    httpOnly:true,
                    domain:"peerlease-frontend.onrender.com",
                });
                console.log("Cookie",res.cookie);
                console.log("Token",token);

                return res.status(200).json(user)
            }
        }
    }
    catch(e){
        res.send(e);
    }

}
export const logOutUser = async (req,res,next) =>{
    try{
        res.clearCookie("access_token");
        res.status(200).json({message:"User Logged out"});
    }
    catch(e){
        res.send(e);
    }
}