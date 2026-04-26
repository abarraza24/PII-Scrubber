import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import scrubRoutes from "./routes/scrubRoutes.js"
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "../../client/dist");

if (process.env.NODE_EN === "production"){
    app.use(express.static(clientDist));
    app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

const app = express(); 

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

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

app.use(express.static(clientDist));
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) next(err);
  });
});

export default app;