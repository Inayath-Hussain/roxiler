import type { sale } from "@prisma/client";
import { RequestHandler } from "express";

import { tryCatchWrapper } from "../tryCatchWrapper";
import { prismaClient } from "../../config/db";
import { isNumeric } from "validator";


interface Queryparam {
    month: string
}

const controller: RequestHandler<{}, {}, {}, Queryparam> = async (req, res, next) => {
    const { month } = req.query;

    if (!month) return res.status(400).json({ message: "query param 'month' is required" })

    if (typeof month !== "string") return res.status(400).json({ message: "query param 'month' should be of type string" })

    if (isNumeric(month) === false) return res.status(400).json({ message: "month should be a valid number" })

    const records = await prismaClient.$queryRaw<sale[]>`
        SELECT * FROM "sale" WHERE EXTRACT(MONTH FROM "dateOfSale") = ${Number(month)}`

    // for()

    return res.status(200).json({ message: "success" })
}



export const getSalesController = tryCatchWrapper(controller);