import { Router } from "express";
import { processSubmission, upload } from "../controllers/submissionsController";

const router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    await processSubmission(req, res);
});

export default router;
