import { Router } from "express";
import { getTransactionsController } from "../controllers/statistics/getTransactions";

const router = Router();


router.use("/transactions", getTransactionsController);



export { router as statisticsRouter }