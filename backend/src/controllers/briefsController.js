"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBriefs = void 0;
const briefs = [
    { id: 1, title: "Game Design", description: "Make a game using Milanote", keySellingPoints: ["Storyboarding", "Concept Art"] },
    { id: 2, title: "Filmmaking", description: "Use Milanote for planning", keySellingPoints: ["Scriptwriting", "Scene breakdown"] }
];
const getBriefs = (req, res) => {
    res.json(briefs);
};
exports.getBriefs = getBriefs;
