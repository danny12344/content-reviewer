import { Router } from "express";
import { createSubmission } from "../controllers/submissionsController";

const router = Router();

router.post("/", createSubmission); // ✅ Pass the function directly

export default router;
