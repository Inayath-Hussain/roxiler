import { apiURLs } from "../apiURLs"
import { axiosInstance } from "../axiosInstance"
import { ApiError } from "../error"


export interface SalesData {
    totalSalesPrice: number
    soldCount: number
    unsoldCount: number
}


export const getSalesService = (month: number) =>
    new Promise<SalesData | ApiError>(async resolve => {
        try {
            const result = await axiosInstance.get<SalesData>(apiURLs.getSales(month));

            resolve(result.data)
        }
        catch (ex) {
            console.log(ex)
            resolve(new ApiError("Please try again later"))
        }
    })