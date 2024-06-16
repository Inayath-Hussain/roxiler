import { PrismaClient } from "@prisma/client";



export const prismaClient = new PrismaClient({
    log: ["query", "error", "warn"],
    transactionOptions: { timeout: 20000 }
})



export const connectToDb = () =>
    new Promise(resolve => {
        prismaClient.$connect()
            .then(() => {
                console.log("database connected")
                resolve(true)
            })
            .catch((ex) => {
                console.log(ex)
                process.exit(1);
            })
    })