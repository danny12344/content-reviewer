import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import briefRoutes from "./routes/briefs";
import submissionRoutes from "./routes/submissions";
import feedbackRoutes from "./routes/feedback";
import uploadRoutes from "./routes/upload";
import activityCSVRoutes from "./routes/activityCSV";

dotenv.config();

const app = express();


const allowedOrigins = [
    "http://localhost:3000",
    "https://content-reviewer-frontend-91734819578.europe-west2.run.app"
];

app.use(express.json());

// ✅ CORS Configuration
// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 console.error(`Blocked CORS request from origin: ${origin}`);
//                 callback(new Error("Not allowed by CORS"));
//             }
//         },
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//         credentials: true
//     })
// );

app.use(
    cors({
        origin: "*", // Temporarily allow ALL origins (only for debugging)
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true
    })
);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/briefs", briefRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/activity-csv", activityCSVRoutes);

const PORT = parseInt(process.env.PORT as string, 10) || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
