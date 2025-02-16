"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Brief {
    id: number;
    title: string;
    description: string;
    keySellingPoints: string[];
    link: string;
}

export default function BriefsPage() {
    const [briefs, setBriefs] = useState<Brief[]>([]);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log("API URL:", apiUrl); // Debugging

        if (!apiUrl) {
            console.error("NEXT_PUBLIC_API_URL is undefined. Check your .env.local file.");
            return;
        }

        axios.get(`${apiUrl}/api/briefs`) // Ensure the URL structure is correct
            .then(response => setBriefs(response.data))
            .catch(error => console.error("Error fetching briefs:", error));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Creative Briefs</h1>

            <div className="space-y-4">
                {briefs.map((brief) => (
                    <div key={brief.id} className="bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold">{brief.title}</h2>
                        <p className="text-gray-300">{brief.description}</p>
                        <p className="mt-2 text-gray-400">
                            <strong>Key Selling Points:</strong> {brief.keySellingPoints.join(", ")}
                        </p>
                        <button
                            onClick={() => window.open(brief.link, "_blank")}
                            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                            Open Brief
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
