"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFeedback = void 0;
const generateFeedback = (req, res) => {
    const { submissionId } = req.params;
    res.json({ submissionId, feedback: `Feedback for submission ${submissionId}` });
};
exports.generateFeedback = generateFeedback;
