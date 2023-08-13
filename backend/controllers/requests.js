import express from "express";
import Users from "../models/Users.js";
import Properties from "../models/Properties.js";
import Requests from "../models/Requests.js";
const router = express.Router();

export const createRequest = async (req,res,next) =>{

    try{
        const property = await Properties.findById(req.params.id);
        const user = await Users.findById(req.user.id);
        const newRequest = new Requests(
            {
                userID: user.id,
                propertyID:property.id
            }
        )
        
        await newRequest.save();
        res.status(200).json(newRequest);
      }
      catch(e){
        res.send(e);
      }
    
    }
    