"use client";

import { useEffect, useState } from "react";
import { fetchBriefs } from "../services/api";

interface Brief {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
    const [briefs, setBriefs] = useState<Brief[]>([]);

    useEffect(() => {
        fetchBriefs().then(setBriefs);
    }, []);

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Creative Briefs</h1>
            <ul className="space-y-4">
                {briefs.map((brief) => (
                    <li key={brief.id} className="border p-4 rounded-md bg-gray-700">
                        <h3 className="text-lg font-semibold">{brief.title}</h3>
                        <p className="text-gray-300">{brief.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
