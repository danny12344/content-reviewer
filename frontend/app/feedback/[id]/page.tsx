"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchFeedback } from "../../../services/api";

export default function FeedbackPage() {
    const { id } = useParams();
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        if (id) {
            fetchFeedback(Number(id)).then((data) => setFeedback(data.feedback));
        }
    }, [id]);

    return (
        <div>
            <h1>Feedback for Submission {id}</h1>
            <p>{feedback || "Loading feedback..."}</p>
        </div>
    );
}
