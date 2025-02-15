import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Fetch briefs from backend
export const fetchBriefs = async () => {
    try {
        console.log(`Fetching from: ${API_URL}/briefs`);
        const res = await axios.get(`${API_URL}/briefs`);
        console.log("API Response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching briefs:", error);
        throw error;
    }
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
