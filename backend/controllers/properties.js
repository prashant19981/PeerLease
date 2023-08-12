import express from "express";
import cloudinary from 'cloudinary';
import Properties from "../models/Properties.js";
import Users from "../models/Users.js";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET

});


export const createProperty = async(req,res,next)=>{
    const newProperty = new Properties(req.body)
    try{
        // console.log(req.user);
        const files = req.files;
        // console.log(req.files);
        const imageURLs = [];
        for(const file of files){
          const result = await cloudinary.v2.uploader.upload(file.path,{
            folder:'properties/'
          });
          imageURLs.push(result.secure_url);
        }
        newProperty.imageURL = imageURLs;
        const savedProperty = await newProperty.save();
        const user = await Users.findById(req.user.id);
        user.myProperty.push({property: savedProperty.id})
        await user.save();
        res.status(200).json(savedProperty)
    }
    catch(e){
        console.log(e);
        res.status(500).json(e);
    }
};
export const getProperties = async(req,res,next)=>{
    const cityName = req.query.city;
    console.log(cityName)
    try{
        const properties = await Properties.find({city:cityName});
        res.status(200).json(properties);
    }
    catch(e){
        res.status(500).json(e)
    }
    
};

export const getOneProperty = async(req,res,next)=>{
  try{
    const property = await Properties.findById(req.params.id);
    res.status(200).json(property);
  } 
  catch(err){
    res.status(500).json(err);
  } 
};

export const reserveProperty = async(req,res,next) =>{
  try{
    const property = await Properties.findById(req.params.id);
    property.interestedUser.push({user:req.user.id})
    await property.save();
    const user = await Users.findById(req.user.id);
    user.interestedProperty.push({property:property.id});
    await user.save();
    res.send(req.user);
  }
  catch(e){
    res.send(e);
  }
}