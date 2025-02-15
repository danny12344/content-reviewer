"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedbackController_1 = require("../controllers/feedbackController");
const router = (0, express_1.Router)();
router.get("/:submissionId", feedbackController_1.generateFeedback); // ✅ Pass the function directly
exports.default = router;
