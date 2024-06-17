import type { sale } from "@prisma/client";
import { RequestHandler } from "express";

import { tryCatchWrapper } from "../tryCatchWrapper";
import { prismaClient } from "../../config/db";
import { isNumeric } from "validator";


interface Queryparam {
    month: string
}


interface SaleQueryData {
    totalSalesPrice: number
    soldCount: number
    unsoldCount: number
}

const controller: RequestHandler<{}, {}, {}, Queryparam> = async (req, res, next) => {
    const { month } = req.query;

    if (!month) return res.status(400).json({ message: "query param 'month' is required" })

    if (typeof month !== "string") return res.status(400).json({ message: "query param 'month' should be of type string" })

    if (isNumeric(month) === false) return res.status(400).json({ message: "month should be a valid number" })


    const result = await prismaClient.$queryRaw<SaleQueryData>`
    SELECT
        COALESCE(SUM(CASE WHEN sale.sold = true THEN product.price ELSE 0 END), 0) AS totalSalesPrice,
        COALESCE(CAST(COUNT(CASE WHEN sale.sold = true THEN 1 ELSE NULL END) AS INT), 0)  AS soldCount,
        COALESCE(CAST(COUNT(CASE WHEN sale.sold = false THEN 1 ELSE NULL END) AS INT), 0) AS unsoldCount
    FROM product
    JOIN sale ON product."saleId" = sale.id
    WHERE EXTRACT(MONTH FROM sale."dateOfSale") = ${Number(month)}
        `

    return res.status(200).json(result)
}



export const getSalesController = tryCatchWrapper(controller);