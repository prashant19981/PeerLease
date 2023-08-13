import express from "express";
import {verifyUser} from '../middleware/tokenAuth.js'
import Users from "../models/Users.js";
import { createRequest } from "../controllers/requests.js";
const router = express.Router();

router.post("/:id/reserve",verifyUser,createRequest);

export default router;