import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import briefRoutes from "./routes/briefs";
import submissionRoutes from "./routes/submissions";
import feedbackRoutes from "./routes/feedback";
import uploadRoutes from "./routes/upload"; // New Upload Route

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/briefs", briefRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/upload", uploadRoutes); // Register the upload route

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
