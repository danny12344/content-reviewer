import { Request, Response } from "express";

export const generateFeedback = (req: Request, res: Response): void => {
    const { submissionId } = req.params;

    res.json({ submissionId, feedback: `Feedback for submission ${submissionId}` });
};
