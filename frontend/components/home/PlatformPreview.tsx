import React from "react";
import { Command } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlatformPreview() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30 overflow-hidden border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                    <span className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Engineered for Precision</span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-6 uppercase">
                        A Complete Laboratory <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">In Your Browser.</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                        No complex setups. No specialized hardware. Access clinical-grade simulations with zero latency using our proprietary vLAB engine.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Decorative blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>

                    {/* Mockup Frame */}
                    <div className="glass dark:glass-dark rounded-[2.5rem] border border-slate-200/50 dark:border-slate-700/30 shadow-2xl overflow-hidden card-interaction">
                        {/* Mockup Title Bar */}
                        <div className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Experiment_Mode: active</span>
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            </div>
                            <div className="w-12"></div>
                        </div>

                        <div className="flex h-[500px] md:h-[600px]">
                            {/* Mockup Sidebar */}
                            <div className="w-16 md:w-20 bg-white/40 dark:bg-slate-900/40 border-r border-slate-200/30 dark:border-slate-800 flex flex-col items-center py-8 gap-8">
                                {['📂', '🔍', '⚙️', '👤'].map((icon, i) => (
                                    <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all hover:bg-white dark:hover:bg-slate-800 cursor-pointer ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 opacity-60'}`}>
                                        {icon}
                                    </div>
                                ))}
                            </div>

                            {/* Mockup Content Area */}
                            <div className="flex-1 bg-slate-50/30 dark:bg-slate-950/30 p-8 flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Logic_Sim_v2.0</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Current Project: NAND_Gate_Sequence</p>
                                    </div>
                                    <Button className="btn-gradient px-6 rounded-full text-[10px] font-black uppercase tracking-widest h-8">
                                        Compile Simulation
                                    </Button>
                                </div>

                                <div className="flex-1 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] group-hover:bg-blue-500/5 transition-colors duration-500"></div>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-600/30 animate-bounce">
                                            <Command className="w-8 h-8" />
                                        </div>
                                        <div className="h-0.5 w-12 bg-blue-200 dark:bg-blue-800"></div>
                                        <div className="w-16 h-14 bg-slate-200/50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700"></div>
                                    </div>
                                </div>

                                <div className="h-32 bg-slate-900 rounded-xl p-4 font-mono text-[10px] text-blue-400 overflow-hidden relative">
                                    <div className="absolute top-2 right-4 text-slate-600 uppercase font-black tracking-widest text-[8px]">Debugger Terminal</div>
                                    <p className="opacity-60 ">[system] booting simulation core...</p>
                                    <p className="opacity-80 py-1">&gt; initializing all logical gates [OK]</p>
                                    <p className="opacity-100 py-1">&gt; running truth table validation... 100%</p>
                                    <p className="opacity-100 py-1 text-emerald-400">&gt; EXPERIMENT STATUS: STABLE / READY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Character Floating Cards */}
                    <div className="absolute -top-10 -right-6 md:-right-12 w-48 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 animate-bounce transition-all duration-1000">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">⚡</div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">High Fidelity</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">Pixel-perfect medical & engineering grade precision.</p>
                    </div>

                    <div className="absolute top-1/2 -left-6 md:-left-16 w-56 glass p-6 rounded-2xl shadow-2xl border border-white/20 animate-pulse">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">🚀</div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">Instant Access</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-widest">Connect to our cloud infrastructure in under 500ms.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
