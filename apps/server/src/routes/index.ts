import { Router } from "express";
import { seedController } from "../controllers/seed/seedDb";
import { seedRouter } from "./seed";
import { getTransactionsController } from "../controllers/statistics/getTransactions";
import { statisticsRouter } from "./statistics";

const router = Router();


router.use("/seed", seedRouter);
router.use("/statistics", statisticsRouter);


export { router as mainRouter }