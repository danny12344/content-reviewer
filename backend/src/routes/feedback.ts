import { Router } from "express";
import { generateFeedback } from "../controllers/feedbackController";

const router = Router();

router.get("/:submissionId", generateFeedback); // ✅ Pass the function directly

export default router;
