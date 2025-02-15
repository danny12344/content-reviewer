"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Resizable } from "react-resizable"; // ✅ Import resizable component
import "react-resizable/css/styles.css"; // ✅ Import default styles

interface ActivityData {
    id: number;
    createdAt: string;
    campaignId: string;
    sender: string;
    message: string;
    userId: string;
    stageId: number;
    input: string;
    dateInput: string;
    submitted: boolean;
    approved: boolean;
    feedback: string;
}

// ✅ Initial column sizes
const initialColumnWidths: { [key: string]: number } = {
    id: 80,
    createdAt: 200,
    campaignId: 150,
    sender: 120,
    message: 300,
    userId: 120,
    stageId: 100,
    submitted: 100,
    approved: 100,
    input: 300,
    feedback: 300,
};

export default function RawDataPage() {
    const [data, setData] = useState<ActivityData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [columnWidths, setColumnWidths] = useState(initialColumnWidths);
    const rowsPerPage = 10;

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/activity-csv`)
            .then(response => setData(response.data || []))
            .catch(error => {
                console.error("Error fetching data:", error);
                setData([]);
            });
    }, []);

    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage)));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleResize = (column: string, event: any, size: any) => {
        setColumnWidths((prev) => ({
            ...prev,
            [column]: size.width,
        }));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Raw Data</h1>

            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md"
            />

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700">
                <thead>
                    <tr className="bg-gray-800">
                        {Object.keys(initialColumnWidths).map((column) => (
                            <th key={column} className="border border-gray-600 p-2">
                                <Resizable
                                    width={columnWidths[column]}
                                    height={30}
                                    axis="x"
                                    handle={<div className="resizable-handle" />}
                                    onResize={(e, { size }) => handleResize(column, e, size)}
                                    onResizeStop={(e, { size }) => handleResize(column, e, size)}
                                >
                                    <div className="resizable" style={{ width: columnWidths[column], whiteSpace: "nowrap", overflow: "hidden" }}>
                                        {column.charAt(0).toUpperCase() + column.slice(1)}
                                    </div>
                                </Resizable>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        {currentRows.length > 0 ? (
                            currentRows.map((row, index) => (
                                <tr key={row.id ? `row-${row.id}` : `index-${index}`} className="bg-gray-700">
                                    <td className="border border-gray-600 p-2">{row.id || "N/A"}</td>
                                    <td className="border border-gray-600 p-2">
                                        {row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A"}
                                    </td>
                                    <td className="border border-gray-600 p-2">{row.campaignId || "N/A"}</td>
                                    <td className="border border-gray-600 p-2">{row.sender || "N/A"}</td>
                                    <td className="border border-gray-600 p-2">
                                        <ExpandableText text={row.message || "N/A"} />
                                    </td>
                                    <td className="border border-gray-600 p-2">{row.userId || "N/A"}</td>
                                    <td className="border border-gray-600 p-2">{row.stageId || "N/A"}</td>
                                    <td className="border border-gray-600 p-2">{row.submitted ? "✅" : "❌"}</td>
                                    <td className="border border-gray-600 p-2">{row.approved ? "✅" : "❌"}</td>
                                    <td className="border border-gray-600 p-2">
                                        <ExpandableText text={row.input || "N/A"} />
                                    </td>
                                    <td className="border border-gray-600 p-2">
                                        <ExpandableText text={row.feedback || "N/A"} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={11} className="text-center p-4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                >
                    ⬅ Previous
                </button>
                <span className="text-lg">
                    Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
                </span>
                <button 
                    onClick={nextPage} 
                    disabled={indexOfLastRow >= filteredData.length}
                    className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                >
                    Next ➡
                </button>
            </div>
        </div>
    );
}

/** ✅ Expandable Text Component */
function ExpandableText({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <span className="cursor-pointer text-blue-400" onClick={() => setExpanded(!expanded)}>
                {expanded ? text : text.slice(0, 50) + "..."} {/* ✅ Show only 50 chars unless expanded */}
            </span>
        </div>
    );
}
