import express from "express";
import Users from "../models/Users.js";
import Properties from "../models/Properties.js";
const router = express.Router();


export const myProperty = async(req,res,next)=>{
    try{
        const user = await Users.findById(req.user.id);
        const properties = [];
        for(const propertyId of user.myProperty){
            const property = await Properties.findById(propertyId.property);
            if(property){
                properties.push(property);
            }
        }
        res.status(200).json(properties);
    }
    catch (e){
        res.send(e);
    }
}
export const myReservations = async (req,res,next) =>{
    try{
        const user = await Users.findById(req.user.id);
        const properties = [];
        for(const propertyId of user.interestedProperty){
            const property = await Properties.findById(propertyId.property);
            if(property){
                properties.push({property: property,
                isApproved: propertyId.approved});
            }
        }
        res.status(200).json(properties);
    }
    catch (e){
        res.send(e);
    }
    
}
