import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { format } from "fast-csv";

const inputFilePath = path.join(__dirname, "../../data/activity_data.csv");
const outputFilePath = path.join(__dirname, "../../data/activity_data_cleaned.csv");

console.log("🔍 Checking input file path:", inputFilePath);

// Ensure file exists before proceeding
if (!fs.existsSync(inputFilePath)) {
    console.error(`❌ ERROR: File not found at ${inputFilePath}`);
    process.exit(1);
}

interface ActivityData {
    id: number;
    createdAt: string;
    campaignId: string;
    sender: string;
    message: string;
    userId: string;
    stageId: number;
    input: string;
    dateInput: string;
    submitted: boolean;
    approved: boolean;
    feedback: string;
}

// ✅ Read CSV and clean data
const cleanedData: ActivityData[] = [];
const seenIds = new Set<number>(); // Store unique IDs to prevent duplicates

fs.createReadStream(inputFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
        let {
            id,
            createdAt,
            campaignId,
            sender,
            message,
            userId,
            stageId,
            input,
            dateInput,
            submitted,
            approved,
            feedback,
        } = row;

        // ✅ Convert ID to a number and ensure uniqueness
        id = parseInt(id, 10);
        if (isNaN(id) || seenIds.has(id)) return; // Skip duplicate or invalid IDs
        seenIds.add(id);

        // ✅ Standardize date formats
        createdAt = createdAt ? new Date(createdAt).toISOString() : null;
        dateInput = dateInput ? new Date(dateInput).toISOString() : null;

        // ✅ Trim whitespace from text fields
        sender = sender ? sender.trim() : "Unknown";
        message = message ? message.trim() : "";
        feedback = feedback ? feedback.trim() : "";
        input = input ? input.trim() : "";

        // ✅ Convert boolean fields correctly
        submitted = submitted === "true" || submitted === true;
        approved = approved === "true" || approved === true;

        // ✅ Convert stageId to an integer
        stageId = stageId ? parseInt(stageId, 10) : 0;

        cleanedData.push({
            id,
            createdAt,
            campaignId,
            sender,
            message,
            userId,
            stageId,
            input,
            dateInput,
            submitted,
            approved,
            feedback,
        });
    })
    .on("end", () => {
        console.log(`✅ Cleaning complete. Writing ${cleanedData.length} rows to new CSV.`);

        const ws = fs.createWriteStream(outputFilePath);
        const csvStream = format({ headers: true });

        csvStream.pipe(ws).on("finish", () => console.log("✅ Data cleaned successfully!"));

        // ✅ Fix: Ensure headers are written
        csvStream.write({
            id: "id",
            createdAt: "createdAt",
            campaignId: "campaignId",
            sender: "sender",
            message: "message",
            userId: "userId",
            stageId: "stageId",
            input: "input",
            dateInput: "dateInput",
            submitted: "submitted",
            approved: "approved",
            feedback: "feedback",
        });

        // ✅ Write cleaned data as rows
        cleanedData.forEach((row) => {
            csvStream.write(row);
        });

        csvStream.end();
    })
    .on("error", (error) => {
        console.error("❌ Error processing CSV:", error);
    });
