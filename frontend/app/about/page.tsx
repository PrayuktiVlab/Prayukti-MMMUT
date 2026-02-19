"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Target, Eye, Rocket, Info } from "lucide-react";

export default function AboutPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800/50 mb-8"
                        >
                            <Info className="w-4 h-4" />
                            About Prayukti vLAB
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8"
                        >
                            Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Practical Learning</span> <br />
                            for Engineering Students
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="text-xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed"
                        >
                            Empowering future engineers with syllabus-aligned, browser-based virtual simulations for hands-on mastery. We bridge the gap between theory and application.
                        </motion.p>
                    </div>
                </section>

                {/* Who We Are Section */}
                <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.h2
                                {...fadeIn}
                                className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-8"
                            >
                                Who We Are
                            </motion.h2>
                            <motion.div
                                {...fadeIn}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed space-y-6"
                            >
                                <p>
                                    Prayukti vLAB is a cutting-edge Virtual Laboratory platform designed specifically for engineering students to perform syllabus-based practical experiments online. We understand that technical education thrives on experimentation, but physical laboratory access can often be a bottleneck in a student's journey.
                                </p>
                                <p>
                                    Currently aligned with the official syllabus of <strong>Madan Mohan Malaviya University of Technology (MMMUT)</strong>, our platform provides a high-fidelity, interactive environment where students can master complex concepts through standardized modules, ensuring they are industry-ready and academically proficient.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* The Problem We Solve Section */}
                <section className="py-32 bg-white dark:bg-slate-950">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-20">
                            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em] text-xs mb-3 block">Comparison</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">The Problem We Solve</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
                            {/* Challenges */}
                            <motion.div
                                {...fadeIn}
                                className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative group"
                            >
                                <div className="absolute -top-6 -left-6 w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-600 text-2xl border-2 border-white dark:border-slate-800 shadow-xl">
                                    ⚠️
                                </div>
                                <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Traditional Lab Challenges</h3>
                                <ul className="space-y-6">
                                    {[
                                        { title: "Limited Lab Access", desc: "Laboratories are often only available during specific hours, restricting student practice time." },
                                        { title: "No Revision Opportunity", desc: "Once the lab session ends, students usually cannot revisit the physical equipment for revision." },
                                        { title: "Weak Viva Preparation", desc: "Lack of structured theoretical questioning during practicals leads to poor viva performance." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 flex-shrink-0"></div>
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Our Solution */}
                            <motion.div
                                {...fadeIn}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-blue-600 p-10 rounded-[2.5rem] border border-blue-500 shadow-2xl shadow-blue-500/20 relative group text-white"
                            >
                                <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 text-3xl border-2 border-blue-500 shadow-xl">
                                    ✨
                                </div>
                                <h3 className="text-2xl font-bold mb-8">Prayukti Solution</h3>
                                <ul className="space-y-6">
                                    {[
                                        { title: "24/7 Browser-Based Access", desc: "No installations required. Access high-quality simulations from any device, anytime." },
                                        { title: "Unlimited Practice", desc: "Repeat experiments as many times as needed to build intuition and confidence." },
                                        { title: "Viva-Focused Modules", desc: "Integrated Q&A and AI-ready modules to prepare you for actual examination viva-voce." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <CheckCircle2 className="w-5 h-5 text-blue-200 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-white">{item.title}</p>
                                                <p className="text-blue-100/80 text-sm">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Our Mission Section */}
                <section className="py-32 section-shade-soft relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-950 p-12 md:p-20 rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50 shadow-xl text-center">
                            <motion.div
                                {...fadeIn}
                                className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl mb-8"
                            >
                                <Target className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                            </motion.div>
                            <motion.h2
                                {...fadeIn}
                                className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8"
                            >
                                Our Mission
                            </motion.h2>
                            <motion.p
                                {...fadeIn}
                                className="text-2xl md:text-1xl  bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-tight"
                            >
                                "To build a nationwide virtual lab ecosystem that ensures every engineering student can access accurate, syllabus-aligned practical learning anytime, anywhere . <br /> We aim to create a unified, technology-driven platform that bridges the gap between theoretical knowledge and hands-on experimentation, empowering students with confidence, clarity, and real-world readiness."
                            </motion.p>
                            <motion.div
                                {...fadeIn}
                                className="h-1 w-24 bg-indigo-600 mx-auto mt-12 rounded-full"
                            ></motion.div>
                        </div>
                    </div>
                </section>

                {/* Vision for the Future Section */}
                <section className="py-32 bg-white dark:bg-slate-950">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                            <motion.div {...fadeIn}>
                                <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Future Roadmap</span>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8">Vision for the Future</h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                                    We are not just a virtual lab; we are building a nationwide ecosystem for engineering excellence. Our goal is to scale beyond MMMUT to empower students across India.
                                </p>

                                <div className="space-y-8">
                                    {[
                                        { icon: <Rocket className="w-6 h-6" />, title: "Nationwide Expansion", desc: "Scaling our platform to support the curriculum of multiple premium universities across India." },
                                        { icon: <Eye className="w-6 h-6" />, title: "AI-Based Viva System", desc: "Implementing intelligent systems to simulate real viva-voce examinations with adaptive feedback." },
                                        { icon: <Info className="w-6 h-6" />, title: "Collaborative Labs", desc: "Introducing multiplayer-style collaborative lab sessions where students can experiment together." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                {...fadeIn}
                                transition={{ duration: 0.8 }}
                                className="relative lg:h-[600px] bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden"
                            >
                                {/* Visual Representation of Vision - Abstract shapes */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-64 h-64">
                                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-blob"></div>
                                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                    <div className="glass p-8 rounded-3xl border border-white/20 shadow-2xl">
                                        <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">Expansion Insight</p>
                                        <p className="text-2xl font-black text-slate-900 dark:text-white mb-4">India's First Truly Syllabus-Centric vLAB Ecosystem.</p>
                                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "65%" }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-indigo-600"
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="py-32 relative overflow-hidden bg-white dark:bg-slate-950">
                    <div className="container mx-auto px-4">
                        <div className="bg-slate-900 dark:bg-white rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden group">
                            {/* Background Accents */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -ml-48 -mb-48 transition-transform duration-1000 group-hover:scale-110"></div>

                            <div className="relative z-10">
                                <motion.h2
                                    {...fadeIn}
                                    className="text-4xl md:text-6xl font-black text-white dark:text-slate-900 tracking-tight mb-8"
                                >
                                    Join the Future of <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600">Practical Learning</span>
                                </motion.h2>
                                <motion.p
                                    {...fadeIn}
                                    className="text-xl text-slate-400 dark:text-slate-500 font-medium max-w-2xl mx-auto mb-12"
                                >
                                    Start your journey towards mastering engineering practicals with the most interactive virtual lab ecosystem.
                                </motion.p>
                                <motion.div
                                    {...fadeIn}
                                    className="flex flex-col sm:flex-row gap-6 justify-center"
                                >
                                    <Link href="/login">
                                        <Button size="lg" className="h-16 px-12 text-xl rounded-full btn-gradient btn-interaction w-full sm:w-auto">
                                            Start Practicing <ArrowRight className="ml-3 w-6 h-6" />
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/dld">
                                        <Button size="lg" className="h-16 px-12 text-xl rounded-full border-2 border-slate-700 dark:border-slate-200 text-white dark:text-slate-900 hover:bg-white/10 dark:hover:bg-slate-100 transition-all btn-interaction w-full sm:w-auto">
                                            Explore Labs
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
