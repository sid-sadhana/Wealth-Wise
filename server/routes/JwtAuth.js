import express from 'express';
import { signin, signup ,checkcred,getverifytoken} from "../controllers/JwtController.js";
const router = express.Router();

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/checkcred", checkcred)

router.get("/getvtk", getverifytoken)

export default router
