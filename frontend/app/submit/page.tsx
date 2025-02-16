"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

interface Brief {
    id: number;
    title: string;
    link: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL?.trim();

export default function SubmitContentPage() {
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [selectedBrief, setSelectedBrief] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(`Fetching from API: ${API_URL}/api/briefs`); // Debugging
        axios.get(`${API_URL}/api/briefs`)
            .then(response => setBriefs(response.data))
            .catch(error => console.error("Error fetching briefs:", error));
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file || !selectedBrief) {
            alert("Please select a brief and upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("briefUrl", selectedBrief);

        setLoading(true);
        try {
            console.log(`Submitting file to: ${API_URL}/api/submissions/upload`); // Debugging
            const response = await axios.post(`${API_URL}/api/submissions/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setFeedback(response.data.feedback);
        } catch (error) {
            console.error("Error submitting:", error);
            setFeedback("Failed to retrieve feedback.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Submit Your Content</h1>

            {/* File Upload */}
            <div className="mb-4">
                <label className="block mb-2">Upload your script:</label>
                <input 
                    type="file" 
                    accept=".txt,.pdf,.doc,.docx" 
                    onChange={handleFileChange} 
                    className="w-full p-2 bg-gray-700 text-white rounded cursor-pointer" 
                />
            </div>

            {/* Brief Selection */}
            <div className="mb-4">
                <label className="block mb-2">Select a Brief:</label>
                <select 
                    value={selectedBrief || ""} 
                    onChange={(e) => setSelectedBrief(e.target.value)} 
                    className="w-full p-2 bg-gray-700 text-white rounded"
                >
                    <option value="">-- Select a Brief --</option>
                    {briefs.map((brief) => (
                        <option key={brief.id} value={brief.link}>{brief.title}</option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <button 
                onClick={handleSubmit} 
                className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded"
                disabled={loading}
            >
                {loading ? "Processing..." : "Get Feedback"}
            </button>

            {/* Feedback Display */}
            {feedback && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">AI Feedback:</h2>
                    <div className="prose max-w-full text-white bg-gray-800 p-4 rounded-md">
                        <ReactMarkdown>{feedback}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}
