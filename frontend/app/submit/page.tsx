"use client";

import { useState } from "react";
import axios from "axios";

export default function SubmitPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:5001/api/upload", 
                formData, 
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setUploadStatus(response.data.message);
        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("File upload failed.");
        }
    };

    return (
        <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Submit Content</h1>
            <input 
                type="file" 
                accept=".txt,.pdf,.doc,.docx" 
                onChange={handleFileChange} 
                className="mb-4 border p-2 bg-gray-700"
            />
            <button 
                onClick={handleUpload} 
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                Upload
            </button>
            {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
        </div>
    );
}
