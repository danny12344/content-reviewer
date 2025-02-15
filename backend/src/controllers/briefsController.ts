import { Request, Response } from "express";
import { Brief } from "../models/Brief";

const briefs: Brief[] = [
  { id: 1, title: "Game Design", description: "Make a game using Milanote", keySellingPoints: ["Storyboarding", "Concept Art"], link: "https://milanote.notion.site/Game-Design-Creative-Brief-bd4412589d884111a6cfc670b4f9b832" },
  { id: 2, title: "Visual Creator", description: "Visual Creator Creative Brief", keySellingPoints: ["Creative Direction", "Photography"], link: "https://milanote.notion.site/Visual-Creator-Creative-Brief-1e1edc06f95c45a38b1d56fec461a1b0" },
  { id: 3, title: "Filmmaking", description: "Use Milanote for planning", keySellingPoints: ["Scriptwriting", "Scene Breakdown"], link: "https://milanote.notion.site/Filmmaking-Creative-Brief-5cf8f24a4fb948199492952f21acba80" },
  { id: 4, title: "Logo Design", description: "Logo Design Creative Brief", keySellingPoints: ["Branding", "Graphic Design"], link: "https://milanote.notion.site/Logo-Design-Creative-Brief-117aaa0eb013808e81cbdc9ed9796cb2" },
  { id: 5, title: "BookTuber", description: "BookTuber Creative Brief", keySellingPoints: ["Book Reviews", "Literary Analysis"], link: "https://milanote.notion.site/BookTuber-Creative-Brief-f3bbbf8561c74570a6f6a712736aeef7" }
];

export const getBriefs = (req: Request, res: Response) => {
  res.json(briefs);
};
