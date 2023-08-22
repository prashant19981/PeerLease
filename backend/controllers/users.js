import express from "express";
import Users from "../models/Users.js";
import Properties from "../models/Properties.js";
import Requests from "../models/Requests.js";
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
export const myRequests = async (req,res,next) =>{
    try{
        // const user = await Users.findById(req.user.id);
        const properties = await Requests.find({
            userID:req.user.id
        });
        const propertiesinfo = [];
        for(const value of properties){
            const property = await Properties.findById(value.propertyID);
            if(property){
                propertiesinfo.push({property: property,
                isApproved: value.approved,
                status:value.status});
            }
        }
        res.status(200).json(propertiesinfo);
    }
    catch (e){
        res.send(e);
    }
    
}
