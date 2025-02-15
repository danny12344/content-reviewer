"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submissionsController_1 = require("../controllers/submissionsController");
const router = (0, express_1.Router)();
router.post("/", submissionsController_1.createSubmission); // Ensure function is passed correctly
exports.default = router;
