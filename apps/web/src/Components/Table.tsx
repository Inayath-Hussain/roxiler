import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from 'react';
import { TransactionsData, getTransactionsService } from '../services/statistics/getTransactions';
import { ApiError } from '../services/error';


interface Iprops {
    month: number
}




const Table: React.FC<Iprops> = ({ month }) => {

    const [page, setPage] = useState(1);

    const [rowData, setRowData] = useState<TransactionsData[]>([]);

    const [colData] = useState<Record<"field", keyof TransactionsData>[]>([
        { field: "id" },
        { field: "title" },
        { field: "description" },
        { field: "price" },
        { field: "sale" },
        { field: "image" }
    ]);


    useEffect(() => {
        const call = async () => {

            // add debouncing
            getTransactionsService(page, month)
                .then(data => {
                    if (data instanceof ApiError) return
                    setRowData(data)
                })
        };


        call()
    }, [month, page])


    return (
        <div className="ag-theme-quartz h-[500px] w-[1205px]">

            <h1 className='text-center text-4xl my-6'>Transactions</h1>

            <AgGridReact rowData={rowData} columnDefs={colData} />

            {/* page data */}
            <div className='flex flex-row justify-between items-center'>
                <p>Page No - {page}</p>


                {/* page navigation */}
                <div className='flex flex-row gap-6 mt-8'>
                    <button onClick={() => setPage(prev => prev - 1)} className='border-[1px] rounded-2xl border-black px-4 py-2'>Previous</button>
                    <button onClick={() => setPage(prev => prev + 1)} className='border-[1px] rounded-2xl border-black px-4 py-2'>Next</button>
                </div>


                <p>Per Page - 10</p>

            </div>
        </div>
    );
}

export default Table;