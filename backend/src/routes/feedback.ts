import { Router } from "express";
import { generateFeedback } from "../controllers/feedbackController";

const router = Router();
router.get("/:submissionId", generateFeedback);

export default router;
