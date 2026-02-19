"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import {
    Mail, MapPin, Github, Linkedin, Twitter, Instagram,
    Send, ChevronDown, MessageCircle, X, CheckCircle2,
    ArrowRight, Bot, FlaskConical, Lightbulb, HelpCircle,
    User, AtSign, GraduationCap, Tag, FileText, Plus, Minus
} from "lucide-react";

// ─── Static Data ──────────────────────────────────────────────
const SUPPORT_CATEGORIES = [
    "Select a category...",
    "Technical Issue",
    "Syllabus Suggestion",
    "University Integration Request",
    "Feedback",
    "Partnership Inquiry",
    "General Inquiry",
];

const CONTACT_INFO = [
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email Us",
        value: "contact@prayuktivlab.in",
        href: "mailto:contact@prayuktivlab.in",
        color: "text-blue-600",
        bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
        icon: <MapPin className="w-5 h-5" />,
        label: "Located At",
        value: "MMMUT, Gorakhpur, Uttar Pradesh, India",
        href: "https://maps.google.com/?q=Madan+Mohan+Malaviya+University+of+Technology+Gorakhpur",
        color: "text-indigo-600",
        bg: "bg-indigo-50 dark:bg-indigo-950",
    },
    {
        icon: <Github className="w-5 h-5" />,
        label: "GitHub",
        value: "github.com/prayukti-vlab",
        href: "https://github.com",
        color: "text-slate-700 dark:text-slate-300",
        bg: "bg-slate-100 dark:bg-slate-800",
    },
    {
        icon: <Linkedin className="w-5 h-5" />,
        label: "LinkedIn",
        value: "linkedin.com/company/prayukti",
        href: "https://linkedin.com",
        color: "text-sky-600",
        bg: "bg-sky-50 dark:bg-sky-950",
    },
];

const SOCIAL_LINKS = [
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com", color: "hover:bg-sky-100 dark:hover:bg-sky-900/40 hover:text-sky-600" },
    { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com", color: "hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "https://twitter.com", color: "hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-500" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "https://instagram.com", color: "hover:bg-pink-100 dark:hover:bg-pink-900/40 hover:text-pink-500" },
];

const CHATBOT_OPTIONS = [
    { icon: <FlaskConical className="w-4 h-4" />, label: "Ask about syllabus" },
    { icon: <HelpCircle className="w-4 h-4" />, label: "Report a technical issue" },
    { icon: <Lightbulb className="w-4 h-4" />, label: "Request university integration" },
    { icon: <MessageCircle className="w-4 h-4" />, label: "General inquiry" },
];

const CONTACT_FAQS = [
    {
        q: "How quickly will I get a response?",
        a: "Our team typically responds within 24 hours on business days. For urgent technical issues, please mention it in the subject line of your message.",
    },
    {
        q: "How can I request university integration?",
        a: "Fill the contact form above, select \"University Integration Request\" as the category, and check the \"Request My University\" checkbox. We'll reach out with a tailored onboarding plan.",
    },
    {
        q: "Is Prayukti vLAB free for students?",
        a: "Yes! Prayukti vLAB is completely free for all engineering students. You can access all virtual experiments anytime, anywhere — no installation needed.",
    },
    {
        q: "My experiment isn't loading. What do I do?",
        a: "Please try a hard refresh (Ctrl + Shift + R), clear browser cache, and ensure JavaScript is enabled. If the issue persists, use the form above and select \"Technical Issue\" so our team can help.",
    },
    {
        q: "Can I suggest a new experiment or syllabus topic?",
        a: "Absolutely! We love community-driven improvements. Select \"Syllabus Suggestion\" in the form and describe the topic or experiment you'd like us to add.",
    },
    {
        q: "Do you offer partnerships with colleges or EdTech companies?",
        a: "Yes, we're open to meaningful partnerships. Please select \"Partnership Inquiry\" from the dropdown and briefly describe your proposal — we'll get back to you within 48 hours.",
    },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
});

// ─── FAQ Accordion Item ───────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${open
                    ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20"
                    : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800"
                }`}
            onClick={() => setOpen(!open)}
        >
            <div className="flex items-center justify-between gap-4 px-5 py-4">
                <p className={`text-sm font-bold leading-snug transition-colors ${open ? "text-indigo-700 dark:text-indigo-400" : "text-slate-800 dark:text-slate-200"}`}>
                    {q}
                </p>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
                    ${open ? "bg-indigo-600 text-white rotate-0" : "bg-slate-100 dark:bg-slate-800 text-slate-500 rotate-0"}`}
                >
                    {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
            </div>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Chatbot Widget ───────────────────────────────────────────
function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-blue-500/60 active:scale-95"
                aria-label="Toggle chatbot"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X className="w-6 h-6" />
                        </motion.span>
                    ) : (
                        <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Bot className="w-6 h-6" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>

            {/* Chatbot Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-28 right-8 z-50 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Prayukti Assistant</p>
                                    <span className="text-xs text-blue-200 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5">
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl px-4 py-3 mb-5">
                                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                                    Hi 👋 How can we help you today?
                                </p>
                            </div>

                            {selectedOption ? (
                                <div className="space-y-3">
                                    <div className="bg-blue-50 dark:bg-blue-950/40 rounded-2xl px-4 py-3 border border-blue-100 dark:border-blue-900">
                                        <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold mb-1">Your query:</p>
                                        <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">{selectedOption}</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl px-4 py-3">
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Thanks! Please fill out the contact form on this page and our team will respond within 24 hours. 🚀
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedOption(null)}
                                        className="w-full text-xs text-blue-600 dark:text-blue-400 font-bold py-2 hover:underline"
                                    >
                                        ← Back to options
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Quick options</p>
                                    {CHATBOT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => setSelectedOption(opt.label)}
                                            className="w-full flex items-center gap-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-400 border border-slate-100 dark:border-slate-700 transition-all duration-200 group"
                                        >
                                            <span className="text-blue-500 group-hover:scale-110 transition-transform">{opt.icon}</span>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ─── Main Page ────────────────────────────────────────────────
export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "", email: "", university: "", category: "", message: "", requestUniversity: false,
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.category || formState.category === "Select a category..." || !formState.message) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200)); // Simulate async submission
        setLoading(false);
        setSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        setFormState((prev) => ({
            ...prev,
            [target.name]: target.type === "checkbox" ? target.checked : target.value,
        }));
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            <Navbar />

            <main className="flex-1">

                {/* ─── Hero ─────────────────────────────────────────────── */}
                <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-300/20 dark:bg-blue-900/15 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                        <div className="absolute top-20 -right-4 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-900/15 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800/50 mb-8"
                        >
                            <Mail className="w-4 h-4" /> Get In Touch
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6"
                        >
                            Contact{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Our Team
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
                        >
                            Have a question, suggestion, or want to integrate your university? We'd love to hear from you.
                        </motion.p>
                    </div>
                </section>

                {/* ─── Main Two-Column Section ──────────────────────────── */}
                <section className="pb-28">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-5 gap-16">

                            {/* LEFT – Contact Form (3 cols) */}
                            <div className="lg:col-span-3">
                                <motion.div {...fadeUp()} className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-100 dark:shadow-none overflow-hidden">
                                    {/* Decorative accent bar */}
                                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-t-3xl" />
                                    {/* Decorative corner glow */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/60 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

                                    <AnimatePresence mode="wait">
                                        {submitted ? (
                                            /* ── Success State ── */
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center text-center py-12 gap-6"
                                            >
                                                <div className="relative">
                                                    <div className="absolute inset-0 rounded-full bg-green-400/20 blur-2xl" />
                                                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-400/30">
                                                        <CheckCircle2 className="w-12 h-12 text-white" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Message Sent! 🎉</h3>
                                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                                        Thanks, <strong className="text-slate-700 dark:text-slate-200">{formState.name}</strong>! We've received your message and will respond within 24 hours.
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", university: "", category: "", message: "", requestUniversity: false }); }}
                                                    className="btn-gradient btn-interaction rounded-full px-8 h-12"
                                                >
                                                    Send Another Message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            /* ── Form ── */
                                            <motion.form key="form" onSubmit={handleSubmit} className="space-y-7">
                                                {/* Form Header */}
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Send Us a Message</h2>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">Fields marked <span className="text-blue-500 font-bold">*</span> are required.</p>
                                                    </div>
                                                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-900">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                        Secure Form
                                                    </div>
                                                </div>

                                                {/* Row 1 – Name + Email */}
                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    <div className="space-y-2 group">
                                                        <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-600 transition-colors">
                                                            <User className="w-3.5 h-3.5" /> Full Name <span className="text-blue-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                                                            <input
                                                                name="name" type="text" required value={formState.name} onChange={handleChange}
                                                                placeholder="Shahjad Ali"
                                                                className="relative w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400 text-sm shadow-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 group">
                                                        <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-600 transition-colors">
                                                            <AtSign className="w-3.5 h-3.5" /> Email Address <span className="text-blue-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                                                            <input
                                                                name="email" type="email" required value={formState.email} onChange={handleChange}
                                                                placeholder="2025200306@mmmut.ac.in"
                                                                className="relative w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400 text-sm shadow-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Row 2 – University + Category */}
                                                <div className="grid sm:grid-cols-2 gap-5">
                                                    <div className="space-y-2 group">
                                                        <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-600 transition-colors">
                                                            <GraduationCap className="w-3.5 h-3.5" /> University / College <span className="normal-case text-slate-400 font-normal">(optional)</span>
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                                                            <input
                                                                name="university" type="text" value={formState.university} onChange={handleChange}
                                                                placeholder="e.g. MMMUT, Gorakhpur"
                                                                className="relative w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400 text-sm shadow-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 group">
                                                        <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-600 transition-colors">
                                                            <Tag className="w-3.5 h-3.5" /> Support Category <span className="text-blue-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                                                            <select
                                                                name="category" required value={formState.category} onChange={handleChange}
                                                                className="relative appearance-none w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium text-sm pr-10 shadow-sm"
                                                            >
                                                                {SUPPORT_CATEGORIES.map((cat) => (
                                                                    <option key={cat} value={cat === "Select a category..." ? "" : cat} disabled={cat === "Select a category..."}>{cat}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <div className="space-y-2 group">
                                                    <label className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-500 group-focus-within:text-blue-600 transition-colors">
                                                        <FileText className="w-3.5 h-3.5" /> Message <span className="text-blue-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500" />
                                                        <textarea
                                                            name="message" required value={formState.message} onChange={handleChange} rows={5}
                                                            placeholder="Describe your issue, suggestion, or inquiry in detail..."
                                                            className="relative w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium resize-none text-sm placeholder:text-slate-400 shadow-sm"
                                                        />
                                                    </div>
                                                    <p className="text-right text-xs text-slate-400">{formState.message.length} / 1000 characters</p>
                                                </div>

                                                {/* Checkbox */}
                                                <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200">
                                                    <div className="relative mt-0.5 flex-shrink-0">
                                                        <input
                                                            type="checkbox" name="requestUniversity" checked={formState.requestUniversity} onChange={handleChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-indigo-600 peer-checked:border-blue-500 transition-all flex items-center justify-center shadow-sm">
                                                            {formState.requestUniversity && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            🏫 Request My University
                                                        </p>
                                                        <p className="text-xs text-slate-400 mt-0.5">I'd like Prayukti vLAB to support my institution's syllabus.</p>
                                                    </div>
                                                </label>

                                                {/* Submit */}
                                                <div className="space-y-3 pt-1">
                                                    <button
                                                        type="submit" disabled={loading}
                                                        className="group w-full h-14 text-base rounded-2xl font-bold flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                                    >
                                                        {loading ? (
                                                            <><span className="w-5 h-5 rounded-full border-2 border-white border-b-blue-300 animate-spin" />Sending your message...</>
                                                        ) : (
                                                            <><Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                                        )}
                                                    </button>
                                                    <p className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                                                        🕐 We typically respond within <span className="font-bold text-slate-600 dark:text-slate-300">24 hours</span>.
                                                    </p>
                                                </div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* RIGHT – Info Cards (2 cols) */}
                            <div className="lg:col-span-2 space-y-5 lg:pl-2">

                                {/* Contact Info Cards */}
                                <motion.div {...fadeUp(0.1)} className="space-y-4">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Direct Contact</h3>
                                    {CONTACT_INFO.map((item) => (
                                        <a
                                            key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
                                        >
                                            <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                {item.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{item.label}</p>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{item.value}</p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto flex-shrink-0 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                        </a>
                                    ))}
                                </motion.div>

                                {/* Social Media */}
                                <motion.div {...fadeUp(0.2)} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Follow Us</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {SOCIAL_LINKS.map((link) => (
                                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                                                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800 ${link.color} transition-all duration-200 group font-semibold text-sm text-slate-600 dark:text-slate-400`}
                                            >
                                                <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* FAQ Shortcut */}
                                <motion.div {...fadeUp(0.25)} className="p-5 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Have a quick question?{" "}
                                        <Link href="#faq" className="font-bold text-indigo-600 dark:text-indigo-400 relative group inline-block">
                                            Visit our FAQ section
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        </Link>
                                        .
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Trust Message ─────────────────────────────────────── */}
                <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-y border-blue-100 dark:border-blue-900/30">
                    <div className="container mx-auto px-4 text-center">
                        <motion.p {...fadeUp()} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            💡 We value student feedback and continuously improve our platform to deliver{" "}
                            <span className="font-bold text-slate-900 dark:text-white">accurate, syllabus-aligned virtual practical learning experiences</span>{" "}
                            for engineering students across India.
                        </motion.p>
                    </div>
                </section>

                {/* ─── Map + FAQ ──────────────────────────────────────────── */}
                <section className="py-24 bg-white dark:bg-slate-950">
                    <div className="container mx-auto px-4" id="faq">
                        <motion.div {...fadeUp()} className="mb-12">
                            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Find Us & Learn More</span>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Location & Common Questions</h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* LEFT – FAQ accordion */}
                            <motion.div {...fadeUp(0.05)} className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                                        <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200">Frequently Asked Questions</h3>
                                </div>
                                {CONTACT_FAQS.map((faq, i) => (
                                    <FaqItem key={i} q={faq.q} a={faq.a} />
                                ))}
                            </motion.div>

                            {/* RIGHT – Map */}
                            <motion.div {...fadeUp(0.1)} className="space-y-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200">Located At — MMMUT, Gorakhpur</h3>
                                </div>
                                <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none w-full h-[300px]">
                                    <iframe
                                        title="MMMUT Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.5553042003237!2d83.3713095!3d26.7553195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991445b0a0c5c1f%3A0x7f8ca5a61b0a1ae1!2sMadan%20Mohan%20Malaviya%20University%20of%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                                <p className="text-xs text-slate-400 text-center">Madan Mohan Malaviya University of Technology, Gorakhpur, UP, India.</p>
                                {/* Quick address card below map */}
                                <a
                                    href="https://maps.google.com/?q=Madan+Mohan+Malaviya+University+of+Technology+Gorakhpur"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors group"
                                >
                                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Open in Google Maps</p>
                                        <p className="text-xs text-slate-400">Gorakhpur, Uttar Pradesh, India</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-blue-400 ml-auto group-hover:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />

            {/* ─── Chatbot Widget ────────────────────────────────────── */}
            <ChatbotWidget />
        </div>
    );
}
