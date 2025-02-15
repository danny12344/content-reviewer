import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import { OpenAI } from "openai";
import axios from "axios";
import * as mammoth from "mammoth";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

export const upload = multer({ storage });

// Extract text from uploaded files
const extractTextFromFile = async (filePath: string, mimetype: string): Promise<string> => {
    try {
        if (mimetype === "text/plain") {
            return fs.readFileSync(filePath, "utf-8");
        }
        if (mimetype === "application/pdf") {
            const data = await pdfParse(fs.readFileSync(filePath));
            return data.text;
        }
        if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const { value } = await mammoth.extractRawText({ path: filePath });
            return value;
        }
        throw new Error("Unsupported file type");
    } catch (error) {
        console.error("❌ Error extracting text:", error);
        throw error;
    }
};

// Extract raw text from Notion pages 
const fetchBriefContent = async (briefUrl: string): Promise<string> => {
    try {
        console.log(`🔍 Fetching brief content from: ${briefUrl}`);
        const response = await axios.get(briefUrl);
        const $ = cheerio.load(response.data);

        // Extract readable text (remove extra metadata)
        let textContent = $("body").text().replace(/\s+/g, " ").trim();

        // Limit text to 2,000 characters (to prevent hitting OpenAI token limit)
        textContent = textContent.substring(0, 2000);
        console.log("📄 Extracted Brief (trimmed):", textContent);
        return textContent;
    } catch (error) {
        console.error("❌ Error fetching brief:", error);
        throw error;
    }
};

// Route handler for file upload & LLM processing
export const processSubmission = async (req: Request, res: Response) => {
    try {
        // Validate input
        if (!req.file || !req.body.briefUrl) {
            return res.status(400).json({ error: "File and brief URL are required." });
        }

        console.log("📁 File received:", req.file.filename);
        console.log("🔗 Brief URL received:", req.body.briefUrl);

        // Extract text from uploaded file
        let extractedScript = await extractTextFromFile(req.file.path, req.file.mimetype);
        extractedScript = extractedScript.substring(0, 2000); // Trim to 2000 characters to avoid hitting token limits
        console.log("📝 Extracted Script (trimmed):", extractedScript);

        // Fetch cleaned brief content
        const briefContent = await fetchBriefContent(req.body.briefUrl);

        let completion;
        try {
            completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                max_tokens: 4000,
                temperature: 0.7,
                messages: [
                    { role: "system", content: "You are a marketing assistant giving feedback on video scripts." },
                    { role: "user", content: `I have this brief from a client:\n${briefContent}\n\nAnd this is my script:\n${extractedScript}\n\nGive me feedback on the script.` }
                ],
            });
        } catch (error: any) {
            console.error("❌ OpenAI API Error (GPT-3.5 Turbo):", error.response ? error.response.data : error.message);

            try {
                completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo", 
                    max_tokens: 400,
                    temperature: 0.7,
                    messages: [
                        { role: "system", content: "You are a marketing assistant giving feedback on video scripts. Format your response using markdown for better readability." },
                        { role: "user", content: `I have this brief from a client:\n${briefContent}\n\nAnd this is my script:\n${extractedScript}\n\nGive me feedback on the script.` }
                    ],
                });                
            } catch (error: any) {
                console.error("❌ OpenAI API Error (Backup Model):", error.response ? error.response.data : error.message);
                return res.status(500).json({ error: "Failed to process submission.", details: error.response ? error.response.data : error.message });
            }
        }

        const feedback = completion.choices[0].message.content;
        console.log("✅ OpenAI Response:", feedback);
        res.json({ feedback });

    } catch (error: any) {
        console.error("❌ Error processing submission:", error);
        res.status(500).json({ error: "Failed to process submission." });
    }
};

export const uploadMiddleware = upload.single("file");
