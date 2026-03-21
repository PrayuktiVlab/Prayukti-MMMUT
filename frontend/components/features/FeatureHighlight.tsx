"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureHighlightProps {
    title: string;
    description: string;
    icon: LucideIcon;
    imageComponent?: React.ReactNode;
    isReversed?: boolean;
}

export function FeatureHighlight({ title, description, icon: Icon, imageComponent, isReversed = false }: FeatureHighlightProps) {
    return (
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 py-24`}>
            <motion.div
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-8"
            >
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Feature Highlight</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter uppercase italic">
                    {title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium max-w-xl">
                    {description}
                </p>
                <div className="flex gap-4">
                    <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                    <p className="text-sm font-bold text-slate-500 italic max-w-md">"Our proprietary VLAB engine allows students to experiment with industry-grade tools directly within their browser, zero installation required."</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, x: isReversed ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full"
            >
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[100px] rounded-full -z-10"></div>
                    <div className="glass dark:glass-dark p-4 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden card-interaction">
                        {imageComponent}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
