import express from 'express';
import {getnews,mainstock} from "../controllers/ActivityController.js";
const router = express.Router();

router.get("/getnews", getnews)

router.post("/mainstock", mainstock)

export default router