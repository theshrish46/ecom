import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/auth.router.js";
import { productRotuer } from './routes/product.router.js'

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(cookieParser());

app.use('/auth', userRouter);
app.use('/product', productRotuer);

export { app };
