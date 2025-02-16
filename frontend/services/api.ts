import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

console.log("Using API URL:", API_URL); 

// Fetch briefs from backend
export const fetchBriefs = async () => {
    try {
        console.log(`Fetching from: ${API_URL}/api/briefs`); 
        const res = await axios.get(`${API_URL}/api/briefs`);
        console.log("API Response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching briefs:", error);
        throw error;
    }
};

// Submit influencer content
export const submitContent = async (briefId: number, content: string) => {
    const res = await axios.post(`${API_URL}/api/submissions`, { briefId, content });
    return res.data;
};

// Fetch feedback for a submission
export const fetchFeedback = async (submissionId: number) => {
    const res = await axios.get(`${API_URL}/api/feedback/${submissionId}`);
    return res.data;  
};

// Submit a file to the backend
export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};