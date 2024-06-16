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

    const [page, setPage] = useState(0);

    const [rowData, setRowData] = useState<TransactionsData[]>([]);
    const [colData, setColData] = useState<Record<"field", keyof TransactionsData>[]>([
        { field: "id" },
        { field: "title" },
        { field: "description" },
        { field: "price" },
        { field: "sale" },
        { field: "image" }
    ]);


    useEffect(() => {
        const call = async () => {
            getTransactionsService(month)
                .then(data => {
                    if (data instanceof ApiError) return
                    setRowData(data)
                })
        }

        call()
    }, [month])

    return (
        <div className="ag-theme-quartz h-[600px] w-[1205px]">
            <AgGridReact rowData={rowData} columnDefs={colData} />

        </div>
    );
}

export default Table;