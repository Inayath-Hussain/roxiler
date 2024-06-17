import { RequestHandler } from "express";
import { isNumeric } from "validator";
import { tryCatchWrapper } from "../tryCatchWrapper";
import { prismaClient } from "../../config/db";


interface QueryParams {
    page: string
    search: string
    month: string
}



interface QueryData {
    id: number
    title: string
    description: string
    price: number
    image: string
    category: string
    sold: boolean
}

const controller: RequestHandler<{}, {}, {}, QueryParams> = async (req, res) => {

    // parse page number and if invalid assign a default page number
    let page = (req.query.page && isNumeric(req.query.page) === true) ? Number(req.query.page) : 1;

    let search = (req.query.search && typeof req.query.search === "string") ? req.query.search : "";

    let month = (req.query.month && typeof req.query.month === "string" && isNumeric(req.query.month) === true) ? req.query.month : 1;

    let skip = page * 10 - 10;



    const records = await prismaClient.$queryRaw<QueryData[]>`
    SELECT product.id, product.title, product.description, product.price, product.image, 
    category.name AS category, 
    sale.sold AS sold,
    sale."dateOfSale"
    FROM product
    LEFT JOIN sale ON product."saleId" = sale.id
    LEFT JOIN category ON product."categoryId" = category.id
    WHERE
        EXTRACT(MONTH FROM sale."dateOfSale") = ${Number(month)} AND
        (
            title ILIKE ${'%' + search + '%'} OR
            description ILIKE ${'%' + search + '%'} OR
            price = ${Number(search)}
        )

    OFFSET ${skip}
    LIMIT ${10}
    `;


    return res.status(200).json(records)
}



export const getTransactionsController = tryCatchWrapper(controller);