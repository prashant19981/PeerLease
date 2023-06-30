import express from "express";
const router = express.Router();


router.get("/",(req,res) => {

    res.send("Route Search reached");
})
export default router;