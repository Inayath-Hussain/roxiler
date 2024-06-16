import { RequestHandler } from "express";
import { equals, isNumeric } from "validator";
import { tryCatchWrapper } from "../tryCatchWrapper";
import { prismaClient } from "../../config/db";


interface QueryParams {
    page: string
    search: string
}


const controller: RequestHandler<{}, {}, {}, QueryParams> = async (req, res) => {

    // parse page number and if invalid assign a default page number
    let page = (req.query.page && isNumeric(req.query.page) === true) ? Number(req.query.page) : 1;

    let search = (req.query.search && typeof req.query.search === "string") ? req.query.search : "";


    let skip = page * 10 - 10;

    const result = await prismaClient.product.findMany({
        where: {
            OR: [
                { title: { contains: search } },
                { description: { contains: search } },
                (isNumeric(search) ? { price: { equals: Number(search) } } : {})
            ]
        },
        // include: { category: { select: { name: true } }, sale: { select: { sold: true } } },
        select: {
            categoryId: false, category: { select: { name: true } },
            saleId: false, sale: { select: { sold: true } },
            title: true, description: true, image: true, id: true, price: true
        },
        skip,
        take: 10
    })


    return res.status(200).json(result)
}



export const getTransactionsController = tryCatchWrapper(controller);