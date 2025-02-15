import { Request, Response } from "express";
import { Submission } from "../models/Submission";

const submissions: Submission[] = [];

export const createSubmission = (req: Request, res: Response) => {
  const { briefId, content } = req.body;
  if (!briefId || !content) return res.status(400).json({ error: "Invalid submission" });

  const newSubmission: Submission = { id: submissions.length + 1, briefId, content };
  submissions.push(newSubmission);

  res.status(201).json({ message: "Submission received", submission: newSubmission });
};
