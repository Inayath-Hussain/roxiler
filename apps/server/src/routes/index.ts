import { Router } from "express";
import { seedController } from "../controllers/seed/seedDb";
import { seedRouter } from "./seed";
import { getTransactionsController } from "../controllers/transactions/getTransactions";

const router = Router();


router.use("/seed", seedRouter);
router.use("/transactions", getTransactionsController);


export { router as mainRouter }