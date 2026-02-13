"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExperimentList } from "@/components/dashboard/ExperimentList";

const practicals = [
    {
        id: 1,
        title: "OSI vs TCP/IP Reference Models",
        difficulty: "Easy" as const,
        href: "/dashboard/cn/1",
        description: "Compare and contrast the OSI and TCP/IP layered architectures through interactive visualisations.",
        duration: "30 mins"
    },
    {
        id: 2,
        title: "CSMA/CD Protocol Study",
        difficulty: "Medium" as const,
        href: "/dashboard/cn/2",
        description: "Simulate collision detection and backoff algorithms in a shared medium network.",
        duration: "45 mins"
    },
    {
        id: 3,
        title: "Token Bus and Token Ring Protocols",
        difficulty: "Medium" as const,
        href: "/dashboard/cn/3",
        description: "Understand token passing mechanisms and ring topology efficiency.",
        duration: "50 mins"
    },
    {
        id: 4,
        title: "Sliding Window Protocols",
        difficulty: "Hard" as const,
        href: "/dashboard/cn/4",
        description: "Implement Stop-and-Wait, Go-Back-N, and Selective Repeat ARQ protocols.",
        duration: "60 mins"
    },
    {
        id: 5,
        title: "Error Detection and Correction",
        difficulty: "Medium" as const,
        href: "/subjects/computer-networks/error-detection",
        description: "Analyze CRC, Checksum, and Hamming Code algorithms for reliable data transmission.",
        duration: "40 mins"
    },
];

export default function CNPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span className="text-primary">Computer Networks</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Computer Networks
                            </h1>
                            <p className="text-slate-600 max-w-2xl leading-relaxed">
                                Explore the fundamental concepts of data communication, network architectures, and protocols through our interactive virtual experiments.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <div className="text-center px-4 border-r border-slate-100">
                                <span className="block text-2xl font-bold text-primary">{practicals.length}</span>
                                <span className="text-xs text-slate-400 uppercase font-bold">Labs</span>
                            </div>
                            <div className="text-center px-4">
                                <span className="block text-2xl font-bold text-green-600">0%</span>
                                <span className="text-xs text-slate-400 uppercase font-bold">Progress</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Experiments List */}
                <ExperimentList subject="Computer Networks" experiments={practicals} />
            </main>

            <Footer />
        </div>
    );
}
