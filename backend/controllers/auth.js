import Users from "../models/Users.js"
import jwt from "jsonwebtoken";

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
        if(user != null){
            if(user.password === req.body.password){
                const token = jwt.sign({id:user._id,name:user.name},process.env.JWT_KEY);
                res.cookie("access_token",token,{
                    httpOnly:true,
                });
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