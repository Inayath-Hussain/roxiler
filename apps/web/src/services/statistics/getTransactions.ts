import { apiURLs } from "../apiURLs"
import { axiosInstance } from "../axiosInstance"
import { ApiError } from "../error"


export interface TransactionsData {
    id: number
    title: string
    description: string
    price: number
    category: string

    sale: boolean
    image: string
}


interface ApiData {
    id: number
    title: string
    description: string
    price: number
    category: { name: string }

    sale: { sold: boolean }
    image: string
}

export const getTransactionsService = (page: number) =>
    new Promise<TransactionsData[] | ApiError>(async resolve => {
        try {
            const result = await axiosInstance.get<ApiData[]>(apiURLs.getTransactions(page))

            const data: TransactionsData[] = result.data.map(d => ({
                id: d.id,
                category: d.category.name,
                description: d.description,
                image: d.image,
                price: d.price,
                sale: d.sale.sold,
                title: d.title
            }))

            resolve(data);
        }
        catch (ex) {
            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }
    })