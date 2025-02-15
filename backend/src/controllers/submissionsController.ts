import { Request, Response } from "express";

export const createSubmission = (req: Request, res: Response): void => {
    res.json({ message: "Submission received" });
};
