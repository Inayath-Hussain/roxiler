import { useEffect, useState } from "react";
import { monthDisplayText } from "../App";
import { SalesData, getSalesService } from "../services/statistics/getSales";
import { ApiError } from "../services/error";

interface Iprops {
    month: number
}


const Sales: React.FC<Iprops> = ({ month }) => {

    const [data, setData] = useState<SalesData>({
        totalSalesPrice: 0,
        soldCount: 0,
        unsoldCount: 0
    })


    useEffect(() => {
        getSalesService(month)
            .then(result => {
                if (result instanceof ApiError) return
                setData(result)
            })
    }, [month])

    return (
        <div className="flex flex-col justify-start items-center mt-[13rem]">
            <h1 className="text-4xl my-7">Statistics - {monthDisplayText[month as keyof typeof monthDisplayText]}</h1>


            <div className="flex flex-row gap-12
             border-[1px] border-black
            text-2xl rounded-2xl py-6 px-10">

                {/* section title */}
                <div className="flex flex-col gap-4">
                    <p>Total Sale</p>
                    <p>Total sold item</p>
                    <p>Total unsold item</p>
                </div>


                <div className="flex flex-col gap-4">
                    <p>{data.totalSalesPrice}</p>
                    <p>{data.soldCount}</p>
                    <p>{data.unsoldCount}</p>
                </div>
            </div>

        </div>
    );
}

export default Sales;