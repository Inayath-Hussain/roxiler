export const apiURLs = {
    getTransactions: (page: number, month: number) => `/api/statistics/transactions?page=${page}&month=${month}`,
    getSales: (month: number) => `/api/statistics/sales?month=${month}`
}