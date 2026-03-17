import { Router } from "express";
import { scrubTextHandler } from "../controllers/scrubController.js";

const router = Router();

router.post("/", scrubTextHandler);

export default router;