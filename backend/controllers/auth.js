import Users from "../models/Users.js"


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