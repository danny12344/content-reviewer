"use client";

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between">
                <h1 className="text-lg font-bold">Content Review Platform</h1>
                <div className="space-x-4">
                    <Link href="/" className="hover:underline">Creative Briefs</Link>
                    <Link href="/submit" className="hover:underline">Submit Content</Link>
                    <Link href="/raw-data" className="hover:underline">Raw Data</Link>  {/* ✅ New Button */}
                </div>
            </div>
        </nav>
    );
}
