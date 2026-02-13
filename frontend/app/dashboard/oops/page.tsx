"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ExperimentList } from "@/components/dashboard/ExperimentList";

const practicals = [
    {
        id: 1,
        title: "Introduction to Classes and Objects",
        difficulty: "Easy" as const,
        href: "/dashboard/oops/1",
        description: "Learn the fundamentals of OOP by creating classes, objects, and methods.",
        duration: "35 mins"
    },
    {
        id: 2,
        title: "Implementation of Inheritance",
        difficulty: "Medium" as const,
        href: "/dashboard/oops/2",
        description: "Understand simple, multilevel, and hierarchical inheritance with practical examples.",
        duration: "45 mins"
    },
    {
        id: 3,
        title: "Demonstration of Polymorphism",
        difficulty: "Medium" as const,
        href: "/dashboard/oops/3",
        description: "Explore compile-time and run-time polymorphism through method overloading and overriding.",
        duration: "50 mins"
    },
    {
        id: 4,
        title: "Data Encapsulation and Abstraction",
        difficulty: "Hard" as const,
        href: "/dashboard/oops/4",
        description: "Secure data using access specifiers and implement abstract classes and interfaces.",
        duration: "60 mins"
    },
];

export default function OOPsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span className="text-primary">OOPs</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Object Oriented Programming
                            </h1>
                            <p className="text-slate-600 max-w-2xl leading-relaxed">
                                Deep dive into modern software design paradigms with interactive coding exercises and visual memory models.
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
                <ExperimentList subject="Object Oriented Programming" experiments={practicals} />
            </main>

            <Footer />
        </div>
    );
}
