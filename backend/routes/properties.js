import express from "express";
import Properties from "../models/Properties.js";
const router = express.Router();


// router.get("/",(req,res) => {

//     res.send("Route users reached");
// })
router.post("/",async(req,res)=>{
    const newProperty = new Properties(req.body)
    try{
        const savedProperty = await newProperty.save();
        res.status(200).json(savedProperty)
    }
    catch(e){
        res.status(500).json(e)
    }
})


export default router;