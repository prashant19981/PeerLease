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
                propertyID:property.id,
                
            }
        )
        
        await newRequest.save();
        res.status(200).json(newRequest);
      }
      catch(e){
        res.send(e);
      }
    
    }
export const checkReserve = async (req,res,next) =>{

  try{
    const request = await Requests.findOne({
      userID: req.user.id,
      propertyID: req.params.id
    })
    if(request){
      return res.status(200).json({exist: true,status:request.status});
    }
    res.status(404).json({exist:false,status:request.status});
  }
  catch(e){
    res.send(e);
  }
}    

export const checkStatus = async (req,res) =>{
  console.log("Reached");
  try{
    const request = await Requests.findOne({
      userID: req.params.userId,
      propertyID: req.params.propertyId
    })
    if(request){
      const {status} = request;
      console.log(status);
      return res.status(200).json(status);
    }
    
  }
  catch(e){
    res.send(e);
  }

}
    