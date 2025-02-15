import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { format } from "fast-csv";

const filePath = path.join(__dirname, "../../data/activity_data_cleaned.csv");

// ✅ Function to read CSV data
export const readCSVData = async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (error) => reject(error));
    });
};

// ✅ Function to write data to CSV
export const writeCSVData = async (data: any[]) => {
    const ws = fs.createWriteStream(filePath);
    format({ headers: true }).pipe(ws).on("finish", () => console.log("CSV file written"));
    data.forEach((row) => ws.write(row));
    ws.end();
};
