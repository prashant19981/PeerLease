import express from "express";
import Properties from "../models/Properties.js";
import { approveRequest, createProperty, getOneProperty, getProperties,getPropertyRequests,reserveProperty } from "../controllers/properties.js";
const router = express.Router();
import {config, uploader} from "cloudinary";
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import dotenv from "dotenv";
import { verifyUser } from "../middleware/tokenAuth.js";
dotenv.config();

// const storage = multer.diskStorage({
//     destination: function (req,file,cb){
//         cb(null, "images/");
//     },
//     filename: function (req,file, cb){
//         const suffix = Date.now();
//         cb(null,suffix+file.originalname);
//     }
    
// });
const storage = new CloudinaryStorage({
    cloudinary:cloudinary.v2,
    
    
});
const upload = multer({storage: storage});


// router.get("/",(req,res) => {

//     res.send("Route users reached");
// })
router.post("/",verifyUser,upload.array('imageURL',5),createProperty)
router.get("/search",getProperties)
router.get("/:id",getOneProperty)

router.post("/:id/reserve",verifyUser,reserveProperty)
router.get("/:id/requests",getPropertyRequests);
router.get("/:userId/:propertyId",verifyUser,approveRequest);
// router.get("/",async(req,res)=>{

// })


export default router;