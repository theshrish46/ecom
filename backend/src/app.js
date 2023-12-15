import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/auth.router.js";

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use('/auth', userRouter);

export { app };
