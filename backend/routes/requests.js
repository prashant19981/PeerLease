import express from "express";
import {verifyUser} from '../middleware/tokenAuth.js'
import Users from "../models/Users.js";
import { createRequest, checkReserve,checkStatus } from "../controllers/requests.js";
const router = express.Router();

router.post("/:id/reserve",verifyUser,createRequest);
router.get("/:id/check-reserve",verifyUser,checkReserve)
router.get("/:userId/:propertyId/status",checkStatus)

export default router;