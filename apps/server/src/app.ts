import cors from "cors";
import express from "express";
import morgan from "morgan";
import { mainRouter } from "./routes";

export const app = express();

app.use(cors({ origin: "*" }))
app.use(morgan("dev"))



app.use("/api", mainRouter)