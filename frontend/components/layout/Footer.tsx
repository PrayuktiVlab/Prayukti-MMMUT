"use client";

import Link from "next/link";
import { Command, Twitter, Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-white py-20 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1)_0%,transparent_70%)]"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
                                <Command className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black tracking-tight">
                                Prayukti VLab
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            A next-generation virtual laboratory platform designed to bridge the gap between theoretical knowledge and practical application.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-sm mb-8">Platform</h4>
                        <ul className="space-y-4">
                            {["Home", "Virtual Labs", "Experiments Request", "Documentation", "Status"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-sm mb-8">Resources</h4>
                        <ul className="space-y-4">
                            {["Student Guide", "Faculty Portal", "Admin Dashboard", "API Documentation", "Community Forum"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-sm mb-8">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 text-sm text-slate-400">
                                <MapPin className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    MMMUT Campus, Gorakhpur<br />
                                    Uttar Pradesh, India 273010
                                </span>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-slate-400">
                                <Phone className="w-5 h-5 text-slate-600 shrink-0" />
                                <span>+91-551-2273958</span>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-slate-400">
                                <Mail className="w-5 h-5 text-slate-600 shrink-0" />
                                <span className="hover:text-white cursor-pointer transition-colors">support@vlab.mmmut.ac.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-medium text-slate-500">
                        © 2025 Prayukti VLab. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs font-medium text-slate-500">
                        <Link href="#" className="hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors uppercase tracking-widest">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors uppercase tracking-widest">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
