import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ✅ FIX: Explicitly define `req` and `res` types
router.post("/", upload.single("file"), (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
        return;
    }
    res.json({ message: "File uploaded successfully!", filePath: `/uploads/${req.file.filename}` });
});

export default router;
