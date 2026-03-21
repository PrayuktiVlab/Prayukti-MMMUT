"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────
interface ModuleItem {
    id: string;
    title: string;
    number: string;
    href: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    icon: string;
    tag: string;
    offset?: boolean; // stagger offset for alt layout
}

// ─── Module data ──────────────────────────────────────────────
const modules: ModuleItem[] = [
    {
        id: "cn",
        title: "Computer Networks",
        number: "#01",
        href: "/dashboard/cn",
        description:
            "Simulate complex topologies, packet flows, and protocol behaviors including CSMA/CD, Token Ring, and OSI Layer interactions.",
        imageSrc: "/cn-module.jpg.jpg",
        imageAlt: "Computer Networks",
        icon: "🌐",
        tag: "Simulation Type: Topology & Protocol",
    },
    {
        id: "dld",
        title: "Digital Logic & Design",
        number: "#02",
        href: "/dashboard/dld",
        description:
            "Build and test logic circuits, master flip-flops, and visualize gate-level operations with real-time waveform analysis.",
        imageSrc: "/dld-module.jpg.jpg",
        imageAlt: "Digital Logic & Design",
        icon: "🧠",
        tag: "Simulation Type: Circuit Design",
        offset: true,
    },
    {
        id: "oops",
        title: "Object Oriented Programming",
        number: "#03",
        href: "/dashboard/oops",
        description:
            "Visualize memory allocation, inheritance hierarchies, and polymorphism through interactive code simulation.",
        imageSrc: "/oops-module.jpg.jpg",
        imageAlt: "Object Oriented Programming",
        icon: "💻",
        tag: "Simulation Type: Code Execution",
    },
    {
        id: "dbms",
        title: "Database Management System",
        number: "#04",
        href: "/dashboard/dbms",
        description:
            "Design schemas, normalize tables, and execute complex SQL queries in a visual environment.",
        imageSrc: "/dbms-module.jpg.jpg",
        imageAlt: "Database Management System",
        icon: "🗄️",
        tag: "Simulation Type: Query Design",
        offset: true,
    },
];

// ─── Auth-aware navigate helper ───────────────────────────────
function useAuthNavigate() {
    const router = useRouter();
    return (labHref: string) => {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("token") ||
                localStorage.getItem("authToken") ||
                sessionStorage.getItem("token")
                : null;
        router.push(token ? labHref : "/login");
    };
}

// ─── Individual Module Card ───────────────────────────────────
function ModuleCard({ mod }: { mod: ModuleItem }) {
    const navigate = useAuthNavigate();
    return (
        <div
            className={`flex flex-col gap-6 group cursor-pointer${mod.offset ? " md:mt-24" : ""}`}
            onClick={() => navigate(mod.href)}
        >
            {/* Image banner */}
            <div className="w-full h-[400px] bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] relative overflow-hidden card-interaction">
                <img
                    src={mod.imageSrc}
                    alt={mod.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Icon badge */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                    <span className="text-3xl">{mod.icon}</span>
                </div>
                {/* Overlay label */}
                <div className="absolute bottom-0 left-0 p-10 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                        Simulation Active
                    </div>
                    <p className="font-bold text-white uppercase text-xs tracking-widest opacity-70">{mod.tag}</p>
                </div>
            </div>

            {/* Card body */}
            <div className="px-2">
                <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {mod.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-400">{mod.number}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                    {mod.description}
                </p>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate(mod.href); }}
                    className="inline-flex items-center gap-3 font-bold uppercase text-xs tracking-[0.2em] text-blue-600 dark:text-blue-400 group/link hover:gap-5 transition-all duration-300"
                >
                    Explore Laboratory{" "}
                    <span className="transform group-hover/link:translate-x-2 transition-transform text-xl">→</span>
                </button>
            </div>
        </div>
    );
}

// ─── Full Academic Modules Section ────────────────────────────
export function AcademicModulesSection() {
    const router = useRouter();

    return (
        <section className="py-32 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-slate-200 dark:border-slate-800 pb-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                            ACADEMIC <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-600">
                                MODULES
                            </span>
                        </h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md">
                            Curriculum-aligned virtual laboratories tailored for precision and interactivity.
                        </p>
                    </div>
                    <div className="mb-2">
                        <div className="text-right hidden md:block">
                            <p className="font-black text-8xl text-indigo-50 dark:text-indigo-900/10 leading-none -mb-6">04</p>
                            <p className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-sm">Active Domains</p>
                        </div>
                    </div>
                </div>

                {/* 2-col staggered module grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {modules.map((mod) => (
                        <ModuleCard key={mod.id} mod={mod} />
                    ))}
                </div>

                {/* ── See All Subjects CTA ── */}
                <div className="mt-20 flex flex-col items-center gap-5">
                    {/* Divider */}
                    <div className="flex items-center gap-4 w-full max-w-lg">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">More subjects coming soon</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                    </div>

                    {/* Big CTA button */}
                    <button
                        onClick={() => router.push("/explore")}
                        className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-2xl text-base font-black uppercase tracking-widest text-white overflow-hidden shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Gradient fill */}
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-violet-700 transition-colors duration-300" />
                        {/* Shine sweep */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                        <Layers className="relative w-5 h-5" />
                        <span className="relative">See All Subjects</span>
                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>

                    <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
                        Browse & filter all labs on the <span className="font-bold text-slate-600 dark:text-slate-400">Explore</span> page
                    </p>
                </div>
            </div>
        </section>
    );
}
