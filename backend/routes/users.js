import express from "express";
import {verifyUser} from '../middleware/tokenAuth.js'
import Users from "../models/Users.js";
import { myProperty, myReservations } from "../controllers/users.js";
const router = express.Router();


router.get("/",(req,res) => {

    res.send("Route users reached");
})
router.get("/userauth",verifyUser,(req,res,next)=>{
    res.send(req.user);
})

router.get("/getname",verifyUser,async (req,res)=>{
    const {name,...other} = req.user;
    res.status(200).json({name : name.split(" ")[0]});
})
router.get("/checklogin",verifyUser, async (req,res)=>{
    res.status(200).json({message:"User is Logged in"});
})

router.get("/my-property",verifyUser,myProperty);

router.get("/my-reservations",verifyUser,myReservations);

export default router;
