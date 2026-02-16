"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, PlayCircle } from "lucide-react";

const practicals = [
    { id: 1, title: "Decimal Addition & Subtraction (8085)", difficulty: "Medium" },
    { id: 2, title: "Hexadecimal Addition & Subtraction (8085)", difficulty: "Easy" },
    { id: 3, title: "Addition & Subtraction of Two BCD Numbers (8085)", difficulty: "Hard" },
    { id: 4, title: "Multiplication & Division of Two 8-bit Numbers (8085)", difficulty: "Medium" },
];

export default function MPMCPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/dashboard" className="text-gray-500 hover:text-black hover:bg-gray-100 p-1 rounded-full transition-colors">Dashboard</Link>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <h1 className="text-xl font-bold text-[#2e7d32]">Microprocessor and Microcontroller</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">List of Experiments</h2>
                    <div className="flex gap-2">
                        <Button variant="outline">Progress Report</Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    {practicals.length > 0 ? (
                        practicals.map((p, index) => (
                            <div key={p.id} className="p-4 border-b last:border-b-0 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">{p.title}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded ${p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                            p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                            }`}>{p.difficulty}</span>
                                    </div>
                                </div>
                                <Link href={`/dashboard/mpmc/${p.id}`}>
                                    <Button variant="ghost" className="gap-2 text-[#2e7d32] hover:text-[#1b5e20] hover:bg-green-50">
                                        Start Practical <PlayCircle className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 mb-4">Labs for Microprocessor and Microcontroller are currently being prepared.</p>
                            <p className="text-sm text-gray-400">Please check back later for exciting experiments with 8085, 8086, and 8051!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
