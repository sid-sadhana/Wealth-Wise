import express from 'express';
import {getnews,mainstock,upload_data,get_data,edit_account} from "../controllers/ActivityController.js";
const router = express.Router();

router.get("/getnews", getnews)

router.post("/mainstock", mainstock)

router.post("/upload-data", upload_data)

router.post("/get-data", get_data)

router.post("/edit-account", edit_account)

export default router