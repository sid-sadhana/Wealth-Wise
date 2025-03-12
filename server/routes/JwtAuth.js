import express from 'express';
import { signin, signup ,checkcred} from "../controllers/JwtController.js";
const router = express.Router();

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/checkcred", checkcred)

export default router
