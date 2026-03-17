import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import scrubRoutes from "./routes/scrubRoutes.js"
import dotenv from 'dotenv';

const app = express(); 

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173"
    })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({limit: "1mb"}));

app.get("/api/health", (_req, res) =>{
    res.json({
        ok: true,
        message: "PII Scrubber API is running."
    });
});

app.use("/api/scrub", scrubRoutes);

export default app;