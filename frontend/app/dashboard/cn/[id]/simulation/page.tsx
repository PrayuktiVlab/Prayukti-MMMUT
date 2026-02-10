"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SimulationRenderer from "@/components/simulation/SimulationRenderer";

export default function SimulationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link href={`/dashboard/cn/${id}`} className="text-gray-500 hover:text-black p-1 rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="font-bold text-gray-800">CN Simulation Workbench <span className="text-gray-400 text-sm font-normal">| Practical {id}</span></h1>
                </div>
            </header>
            <div className="flex-1 overflow-hidden relative">
                <SimulationRenderer labId={id} />
            </div>
        </div>
    );
}
