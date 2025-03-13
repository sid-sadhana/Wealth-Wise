import express from 'express';
import { signin, signup ,checkcred,getverifytoken,getnews,clear} from "../controllers/JwtController.js";
const router = express.Router();

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/checkcred", checkcred)

router.get("/getvtk", getverifytoken)

router.get("/getnews", getnews)

router.get("/clear", clear)

export default router
