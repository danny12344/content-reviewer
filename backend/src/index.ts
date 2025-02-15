import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import briefRoutes from "./routes/briefs";
import submissionRoutes from "./routes/submissions";
import feedbackRoutes from "./routes/feedback";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/briefs", briefRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
