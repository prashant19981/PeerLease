import express from "express";
const router = express.Router();


router.get("/",(req,res) => {

    res.send("Route users reached");
})
export default router;