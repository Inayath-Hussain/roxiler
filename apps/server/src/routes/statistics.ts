import { Router } from "express";
import { getTransactionsController } from "../controllers/statistics/getTransactions";
import { getSalesController } from "../controllers/statistics/getSales";

const router = Router();


router.use("/transactions", getTransactionsController);
router.use("/sales", getSalesController);



export { router as statisticsRouter }