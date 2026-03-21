"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What is this platform?",
        answer: "A comprehensive virtual lab environment specifically designed for engineering students to bridge the gap between theory and practice. It allows you to perform complex experiments online with high-fidelity simulations that mirror real-world lab equipment."
    },
    {
        question: "Is it syllabus-based?",
        answer: "Absolutely. Every experiment hosted on this platform is meticulously aligned with major university engineering syllabi to ensure academic relevance. We regularly update our content to match the latest curriculum changes."
    },
    {
        question: "Do I need to install anything?",
        answer: "No installation or specialized hardware is required to use the platform. Our cloud-based architecture allows you to access all simulation tools and resources directly through any modern web browser."
    },
    {
        question: "Are viva questions included?",
        answer: "Yes, we provide an extensive database of viva-voice questions and detailed answers for every experiment. This helps students prepare effectively for their practical examinations and builds a deeper conceptual understanding."
    },
    {
        question: "Is it free to use?",
        answer: "The platform offers a robust set of basic features and experiments completely free of charge to all students. For those seeking enhanced capabilities, advanced analytics, and premium content, we offer affordable subscription plans."
    },
    {
        question: "How will this help in exams?",
        answer: "By providing repeatable, hands-on practice, the platform reinforces theoretical concepts and improves practical retention. The integrated viva preparation ensures that you are fully confident and well-prepared for final lab exams."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedFaqs = showAll ? faqs : faqs.slice(0, 3);

    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-12 px-2 tracking-tighter">
                    FREQUENTLY ASKED <br />
                    <span className="text-blue-600">QUESTIONS</span>
                </h2>

                <div className="border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm bg-white dark:bg-slate-900/50 backdrop-blur-sm card-interaction">
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {displayedFaqs.map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-slate-900/40">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                                >
                                    <span className="flex-shrink-0 mr-4">
                                        <motion.div
                                            animate={{ rotate: openIndex === index ? 0 : -90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="w-5 h-5 text-slate-900 dark:text-slate-100" />
                                        </motion.div>
                                    </span>
                                    <span className="text-base font-bold text-slate-900 dark:text-slate-100">{faq.question}</span>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-14 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-full p-4 text-sm font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center gap-2 border-t border-slate-100 dark:border-slate-800 btn-interaction"
                    >
                        {showAll ? (
                            <>
                                Show less <ChevronUp className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Show all {faqs.length} questions <ChevronDown className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
