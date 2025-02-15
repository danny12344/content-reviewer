"use client";

import { useState } from "react";
import { submitContent } from "../../services/api";

export default function SubmitPage() {
    const [briefId, setBriefId] = useState<number>(1);
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await submitContent(briefId, content);
            alert(response.message);
        } catch (error) {
            console.error("Error submitting content", error);
        }
    };

    return (
        <div>
            <h2>Submit Content</h2>
            <label>Brief ID:</label>
            <input
                type="number"
                value={briefId}
                onChange={(e) => setBriefId(Number(e.target.value))}
            />
            <label>Content:</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
