import express from "express";
import cloudinary from 'cloudinary';
import Properties from "../models/Properties.js";
import Users from "../models/Users.js";
const router = express.Router();
import dotenv from "dotenv";
import Requests from "../models/Requests.js";
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
export const deleteProperty = async(req,res) =>{
  try{
    const property = await Properties.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Property deleted"});
  }
  catch(e){
    return res.send(e);
  }
}
export const updateProperty = async(req,res) =>{
  try{
    console.log(req.body);
    const property = await Properties.findByIdAndUpdate(req.params.id,
      {$set:req.body},
      {new:true});
      
      if(!property){
        res.status(404).json({message:"Property not found"});
      }
      res.status(200).json(property);
  }
  catch(e){

  }
}
export const getProperties = async(req,res)=>{
    const cityName = req.query.city;
    // console.log(req.query);
    const{city,bills,university,date,gurantor,minPrice,maxPrice} = req.query;
    const searchQuery = {};
    if(city) searchQuery.city = city;
    if(bills) searchQuery.bills = bills;
    if(university) searchQuery.university = university;
    // if(date) searchQuery.date = date;
    if(gurantor) searchQuery.gurantor = gurantor;
    console.log(searchQuery);
    // if(minPrice) searchQuery.minPrice = minPrice;
    // if(maxPrice) searchQuery.maxPrice = maxPrice;

    console.log(cityName)
    try{
        const properties = await Properties.find(searchQuery);
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

export const getPropertyRequests = async(req,res) =>{
  try{
    const users = await Requests.find({
      propertyID:req.params.id
    });
    console.log(users);
    const userDetails = [];
    for(const value of users){
     
      const user = await Users.findById(value.userID);
      
      if(user){
          userDetails.push(user);
      }
  }
  res.status(200).json(userDetails);
  }
  catch(e){
    res.send(e);
  }
}
export const approveRequest = async(req,res) =>{
  try{
    const request = await Requests.findOne({
      userID: req.params.userId,
      propertyID: req.params.propertyId
    })
    if(request){
      request.approved = true;
      request.status = 'Approved'
      await request.save();

    }
    res.status(200).json(request);
  }
  catch (e){
    res.send(e);
  }

}
export const rejectRequest = async(req,res) =>{
  try{
    const request = await Requests.findOne({
      userID: req.params.userId,
      propertyID: req.params.propertyId
    })
    if(request){
      request.status = 'Rejected'
      await request.save();

    }
    res.status(200).json(request);
  }
  catch (e){
    res.send(e);
  }

}