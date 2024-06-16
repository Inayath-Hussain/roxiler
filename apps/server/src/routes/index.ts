import { Router } from "express";
import { seedController } from "../controllers/seed/seedDb";
import { seedRouter } from "./seed";

const router = Router();


router.use("/seed", seedRouter);



export { router as mainRouter }