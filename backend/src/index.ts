import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import briefRoutes from "./routes/briefs";
import submissionRoutes from "./routes/submissions";
import feedbackRoutes from "./routes/feedback";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Routes
app.use("/api/briefs", briefRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
