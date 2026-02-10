"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SimulationRenderer from "@/components/simulation/SimulationRenderer";

export default function SimulationPage({ params }: { params: Promise<{ experimentId: string }> }) {
    const { experimentId } = use(params);
    const labId = experimentId.startsWith('dbms-exp-') ? experimentId : `dbms-exp-${experimentId}`;

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link href={`/dashboard/dbms/${experimentId}`} className="text-gray-500 hover:text-black p-1 rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="font-bold text-gray-800">DBMS Simulation Workbench <span className="text-gray-400 text-sm font-normal">| Practical {experimentId}</span></h1>
                </div>
            </header>
            <div className="flex-1 overflow-hidden relative">
                <SimulationRenderer labId={labId} />
            </div>
        </div>
    );
}
