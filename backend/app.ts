import "dotenv/config";

import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";

import { AppErrorHandler } from "./middlewares/app-error-handler.js";

import BasicRouter from "./routes/basic-routes.js";
import SessionRouter from "routes/session-routes.js";

export const app = express();

// SERVER CONFIGURATIONS
app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.CLIENT_SIDE_URL}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API ROUTES
app.use("/api/v1", SessionRouter);

// BASIC ROUTES
app.use("", BasicRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  AppErrorHandler(err, req, res, next);
});
