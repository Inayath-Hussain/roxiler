import { Router } from "express";
import { seedController } from "../controllers/seed/seedDb";

const router = Router();


router.get("/", seedController);



export { router as seedRouter }