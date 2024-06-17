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


export const getTransactionsService = (page: number, month: number) =>
    new Promise<TransactionsData[] | ApiError>(async resolve => {
        try {
            const result = await axiosInstance.get<TransactionsData[]>(apiURLs.getTransactions(page, month))

            resolve(result.data);
        }
        catch (ex) {
            console.log(ex)
            return resolve(new ApiError("Please try again later"))
        }
    })