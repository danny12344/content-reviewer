import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Fetch briefs from backend
export const fetchBriefs = async () => {
    const res = await axios.get(`${API_URL}/briefs`);
    return res.data;
};

// Submit influencer content
export const submitContent = async (briefId: number, content: string) => {
    const res = await axios.post(`${API_URL}/submissions`, { briefId, content });
    return res.data;
};

// Fetch feedback for a submission
export const fetchFeedback = async (submissionId: number) => {
    const res = await axios.get(`${API_URL}/feedback/${submissionId}`);
    return res.data;
};
