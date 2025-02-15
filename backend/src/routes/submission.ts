import { Router } from "express";
import { createSubmission } from "../controllers/submissionsController";

const router = Router();
router.post("/", createSubmission);

export default router;
