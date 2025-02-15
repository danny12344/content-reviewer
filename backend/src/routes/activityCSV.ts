import { Router, Request, Response } from "express";
import { readCSVData, writeCSVData } from "../utils/csvStorage";

const router = Router();

// Retrieve csv data
router.get("/", async (req: Request, res: Response) => {
    try {
        const data = await readCSVData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to read CSV data" });
    }
});

// Append to csv
router.post("/", async (req: Request, res: Response) => {
    try {
        const newData = req.body;
        const existingData = await readCSVData();
        existingData.push(newData);
        await writeCSVData(existingData);
        res.status(201).json({ message: "Data added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to write CSV data" });
    }
});

export default router;

