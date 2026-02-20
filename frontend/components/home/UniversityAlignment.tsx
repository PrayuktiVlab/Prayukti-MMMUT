"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Globe2 } from "lucide-react";

const universities = [
    {
        name: "Madan Mohan Malaviya University of Technology",
        shortName: "MMMUT",
        logo: "/mmm-logo.png",
        isSupported: true,
    },
    {
        name: "Harcourt Butler Technical University",
        shortName: "HBTU",
        logo: "/hbtu-logo.png",
        isSupported: false,
    },
    {
        name: "Dr. A.P.J. Abdul Kalam Technical University",
        shortName: "AKTU",
        logo: "/aktu-logo.png",
        isSupported: false,
    },
    {
        name: "Deen Dayal Upadhyaya Gorakhpur University",
        shortName: "DDU",
        logo: "/ddu-logo.png",
        isSupported: false,
    },
    {
        name: "National Institute of Technology",
        shortName: "NIT",
        logo: "/nit-logo.png",
        isSupported: false,
    },
    {
        name: "Upcoming Engineering Institutions",
        shortName: "Other Universities",
        logo: "/moreuni.png",
        isSupported: false,
    },
];

export function UniversityAlignment() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800 mb-6">
                        <Globe2 className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Nationwide Expansion</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight mb-8">
                        University-Aligned Today. <br />
                        <span className="text-blue-600 italic">Expanding Nationwide Tomorrow.</span>
                    </h2>

                    <div className="space-y-6 text-lg font-medium text-slate-600 dark:text-slate-400">
                        <p className="leading-relaxed">
                            Our Virtual Lab Platform is currently structured according to the official syllabus of <span className="text-slate-900 dark:text-white font-bold">Madan Mohan Malaviya University of Technology (MMMUT)</span>.
                            Practice exactly what your curriculum demands — nothing extra, nothing missing.
                        </p>

                        <p className="max-w-2xl mx-auto text-base">
                            We are actively integrating additional university syllabi to make this platform accessible to engineering students across India.
                        </p>
                    </div>
                </motion.div>

                {/* University Row */}
                <div className="flex flex-wrap items-stretch justify-center gap-4">
                    {universities.map((uni, index) => (
                        <motion.div
                            key={uni.shortName}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group p-6 rounded-[2rem] bg-white dark:bg-slate-900 border transition-all duration-500 card-interaction flex-1 min-w-[180px] max-w-[240px] ${uni.isSupported
                                ? 'border-blue-500/30 shadow-xl shadow-blue-500/10'
                                : 'border-slate-100 dark:border-slate-800 grayscale hover:grayscale-0'
                                }`}
                        >
                            {uni.isSupported && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 z-10 whitespace-nowrap">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Currently Supported
                                </div>
                            )}

                            <div className="flex flex-col items-center text-center space-y-4 h-full">
                                <div className={`w-20 h-20 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 group-hover:scale-110 transition-transform duration-500 overflow-hidden ${uni.isSupported ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : ''
                                    }`}>
                                    <img
                                        src={uni.logo}
                                        alt={uni.shortName}
                                        className="w-full h-full object-contain filter drop-shadow-sm"
                                    />
                                </div>

                                <div className="space-y-1 mt-auto">
                                    <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                                        {uni.shortName}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                                        {uni.name}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
