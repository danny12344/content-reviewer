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
        <div style={{ 
            maxWidth: "600px", 
            margin: "20px auto", 
            fontFamily: "Arial, sans-serif", 
            backgroundColor: "#121212", 
            color: "#FFFFFF", 
            padding: "20px", 
            borderRadius: "8px" 
        }}>
            <h1 style={{ textAlign: "center", color: "#FFF" }}>Creative Briefs</h1>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {briefs.map((brief) => (
                    <li key={brief.id} style={{ 
                        border: "2px solid #FFF", 
                        padding: "15px", 
                        marginBottom: "10px", 
                        borderRadius: "5px", 
                        backgroundColor: "#222", 
                        color: "#FFF", 
                        fontWeight: "bold"
                    }}>
                        <h3>{brief.title}</h3>
                        <p>{brief.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
