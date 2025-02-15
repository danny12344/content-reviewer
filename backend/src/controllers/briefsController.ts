import { Request, Response } from "express";
import { Brief } from "../models/Brief";

const briefs: Brief[] = [
  { id: 1, title: "Game Design", description: "Make a game using Milanote", keySellingPoints: ["Storyboarding", "Concept Art"] },
  { id: 2, title: "Filmmaking", description: "Use Milanote for planning", keySellingPoints: ["Scriptwriting", "Scene breakdown"] },
  { id: 3, title: "Test", description: "test brief", keySellingPoints: ["Scriptwriting", "test"] }
];

export const getBriefs = (req: Request, res: Response) => {
  res.json(briefs);
};
