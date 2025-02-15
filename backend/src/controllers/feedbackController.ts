import { Request, Response } from "express";
import { Feedback } from "../models/Feedback";
import { getBriefs } from "./briefsController";
import { Submission } from "../models/Submission";

const submissions: Submission[] = [];

export const generateFeedback = (req: Request, res: Response) => {
  const { submissionId } = req.params;
  const submission = submissions.find((s) => s.id === parseInt(submissionId));

  if (!submission) return res.status(404).json({ error: "Submission not found" });

  const briefs = getBriefs({} as Request, {} as Response);
  const brief = briefs.find((b) => b.id === submission.briefId);

  let feedback = `Submission ${submissionId} received. `;
  if (brief) {
    feedback += `Check if it includes: ${brief.keySellingPoints.join(", ")}.`;
  } else {
    feedback += "No matching brief found.";
  }

  const response: Feedback = { submissionId: submission.id, feedback };
  res.json(response);
};
