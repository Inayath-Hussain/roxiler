import type { Prisma, category, sale } from "@prisma/client";
import { RequestHandler } from "express";

import { tryCatchWrapper } from "../tryCatchWrapper";
import axios, { AxiosError } from "axios";
import { env } from "../../config/env";
import { prismaClient } from "../../config/db";


interface Data {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    sold: boolean
    dateOfSale: string
}


const controller: RequestHandler = async (req, res, next) => {

    try {
        const result = await axios.get<Data[]>(env.SEED_URL);

        const totalRecords = await prismaClient.product.count();

        if (totalRecords !== 0) return res.status(200).json({ message: "already seeded" })

        await prismaClient.$transaction(async (tx) => {

            const categoriesCache: Record<string, category> = {}

            for (let d of result.data) {

                const { category, dateOfSale, description, image, price, sold, title } = d;

                // when category is not cached
                if (categoriesCache[category] === undefined) {
                    // create new category
                    const categoryRecod = await tx.category.upsert({
                        create: { name: category },
                        update: {},
                        where: { name: category }
                    })

                    // cache category
                    categoriesCache[category] = categoryRecod;
                }

                if (categoriesCache[category] === undefined) throw Error(`category '${category}' is not found in cache`)

                // create product and sale
                await tx.product.create({
                    data: {
                        // nested write to create sale record
                        sale: {
                            create: {
                                sold,
                                dateOfSale
                            }
                        },
                        description,
                        image,
                        price,
                        title,
                        category: {
                            connect: {
                                id: categoriesCache[category].id
                            }
                        }
                    }
                })

            }
        })


        return res.status(200).json({ message: "success" })
    }
    catch (ex) {
        console.log(ex)
        if (ex instanceof AxiosError) {
            return res.status(ex.response?.status || 500).json(ex.response?.data || { message: "Internal Server Error" })
        }

        return res.status(500).json({ message: "Internal Server Error" })
    }
}



// check if db already seeded




export const seedController = tryCatchWrapper(controller);


prismaClient.product.create({
    data: {
        sale: { create: { sold: false, dateOfSale: "ad" } } as Prisma.saleCreateNestedOneWithoutProductInput,
        description: "",
        image: "",
        price: 2,
        title: "",
        category: {
            create: { name: "" }
        }
    }
})