"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RoleGuard } from "@/lib/auth/withRole";
import { 
    LogOut, 
    ArrowRight, 
    Loader2, 
    AlertCircle, 
    FlaskConical, 
    Network, 
    Database, 
    Code2, 
    Cpu,
    BookOpen,
    Activity,
    ShieldAlert
} from "lucide-react";

interface Subject {
    _id: string;
    title: string;
    description: string;
    icon: string;
    slug: string;
}

export function StudentDashboard() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('vlab_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchSubjects = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${baseUrl}/api/subjects`);
                if (!res.ok) throw new Error("Failed to synchronize simulation modules");
                const data = await res.json();
                setSubjects(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('vlab_token');
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            if (token) {
                await fetch(`${baseUrl}/api/attendance/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (err) {
            console.error('[LOGOUT] attendance API failed:', err);
        } finally {
            localStorage.removeItem('vlab_token');
            localStorage.removeItem('vlab_user');
            router.push('/login');
        }
    };

    const getSubjectIcon = (icon: string, title: string) => {
        const lowerTitle = title.toLowerCase();
        if (icon === "dsa" || lowerTitle.includes("data structure")) return <Code2 className="w-8 h-8 text-indigo-500" />;
        if (icon === "cn" || lowerTitle.includes("network")) return <Network className="w-8 h-8 text-blue-500" />;
        if (icon === "dbms" || lowerTitle.includes("database")) return <Database className="w-8 h-8 text-emerald-500" />;
        if (icon === "dld" || lowerTitle.includes("digital logic")) return <Activity className="w-8 h-8 text-orange-500" />;
        if (icon === "oops" || lowerTitle.includes("object oriented")) return <Cpu className="w-8 h-8 text-purple-500" />;
        if (icon === "mpmc" || lowerTitle.includes("microprocessor")) return <Cpu className="w-8 h-8 text-amber-500" />;
        return <FlaskConical className="w-8 h-8 text-slate-400" />;
    };

    const getSubjectColor = (idx: number) => {
        const colors = [
            "hover:border-indigo-500/50",
            "hover:border-blue-500/50",
            "hover:border-emerald-500/50",
            "hover:border-orange-500/50",
            "hover:border-purple-500/50",
            "hover:border-amber-500/50",
        ];
        return colors[idx % colors.length];
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-500">
            <Navbar />

            <main className="container mx-auto px-4 pt-28 pb-20 max-w-7xl">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="animate-in fade-in slide-in-from-left duration-700">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">User Session Active</p>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none flex flex-wrap items-center gap-4">
                            My <span className="text-blue-600 italic">Dashboard</span>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-4 max-w-xl">
                            {user ? `Welcome back, ${user.fullName.split(' ')[0]}. ` : ""}
                            Select a virtual laboratory module to begin your experimental session.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right duration-700">
                        <RoleGuard allowedRoles={["ADMIN"]}>
                            <Link href="/admin/lab-designer">
                                <Button className="h-14 px-8 uppercase font-black tracking-widest bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-black dark:hover:bg-slate-200 rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none transition-transform active:scale-95">
                                    + Create New Lab
                                </Button>
                            </Link>
                        </RoleGuard>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 h-14 px-6 rounded-2xl font-bold uppercase tracking-widest text-xs border border-red-100 dark:border-red-900/30"
                        >
                            <LogOut size={16} />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Subjects Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Synchronizing Modules...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-red-50 dark:bg-red-950/20 rounded-[3rem] border border-red-100 dark:border-red-900/30 text-center px-6 max-w-2xl mx-auto shadow-2xl">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
                        <h2 className="text-2xl font-black text-red-600 dark:text-red-400 uppercase italic tracking-tighter">Connection Refused</h2>
                        <p className="text-red-500/80 dark:text-red-400/80 max-w-md mx-auto mt-3 font-medium text-lg leading-relaxed">
                            {error}
                        </p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="mt-8 bg-black dark:bg-white dark:text-black text-white px-10 h-12 rounded-xl uppercase font-black tracking-widest text-[10px]"
                        >
                            Reconnect with Core
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {subjects.map((sub, idx) => (
                            <Link key={sub._id} href={`/dashboard/${sub.slug || sub._id}`} className="block group">
                                <Card
                                    className={`h-full transition-all duration-500 border-2 rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl hover:-translate-y-2 group-hover:bg-slate-50/50 dark:group-hover:bg-slate-800/50 ${getSubjectColor(idx)}`}
                                >
                                    <CardContent className="p-8">
                                        <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center mb-8 shadow-inner border border-slate-100 dark:border-slate-800 group-hover:rotate-12 transition-transform duration-500">
                                            {getSubjectIcon(sub.icon, sub.title)}
                                        </div>

                                        <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-4 group-hover:text-blue-600 transition-colors">
                                            {sub.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 line-clamp-3">
                                            {sub.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                                    Active Lab
                                                </span>
                                            </div>
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 text-slate-300 group-hover:text-blue-600" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Status and Exams Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
                    {/* System Status */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center border-2 border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-lg">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 text-blue-600">
                            <Activity size={32} />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-slate-900 dark:text-white italic">System Status</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm leading-relaxed mb-8">
                            Simulation clusters are fully operational. Optimal performance detected across all node regions.
                        </p>
                        <div className="w-full pt-8 border-t border-slate-100 dark:border-slate-800">
                            <Link href="/dashboard/attendance" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline flex items-center justify-center gap-2 group">
                                View Detailed Attendance Log <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Role Specific Actions (Exams) */}
                    <div className="space-y-8">
                        {/* Student Specific: Practical Exams */}
                        <RoleGuard allowedRoles={["STUDENT"]}>
                            <div className="border-2 border-indigo-600/20 rounded-[3rem] p-10 bg-indigo-600 text-white relative overflow-hidden group shadow-2xl shadow-indigo-200 dark:shadow-none">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                        <BookOpen size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Practical Exams</h3>
                                    <p className="text-indigo-100 font-medium mb-8 leading-relaxed max-w-xs">
                                        Check for active or upcoming timed examinations assigned to your batch.
                                    </p>
                                    <Link href="/dashboard/exams">
                                        <Button className="h-12 px-8 uppercase font-black tracking-widest bg-white text-indigo-600 hover:bg-slate-50 rounded-xl transition-transform active:scale-95 text-xs">
                                            Enter Exam Portal
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </RoleGuard>

                        {/* Teacher/Admin Specific: Academic Insights */}
                        <RoleGuard allowedRoles={["TEACHER", "ADMIN"]}>
                            <div className="bg-slate-900 dark:bg-white rounded-[3rem] p-10 text-white dark:text-slate-900 relative overflow-hidden group shadow-2xl border-2 border-transparent">
                                <div className="absolute top-0 right-0 p-40 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Academic Insights</h3>
                                        <p className="text-slate-400 dark:text-slate-500 font-medium mb-8 leading-relaxed max-w-sm">
                                            Administer exams, monitor live results, and manage simulation modules from this dedicated dashboard.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/dashboard/teacher/exams">
                                            <Button className="h-12 px-8 uppercase font-black tracking-widest bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl text-xs hover:scale-105 transition-transform">
                                                Manage Exams
                                            </Button>
                                        </Link>
                                        <Link href="/teacher/analytics">
                                            <Button variant="outline" className="h-12 px-8 uppercase font-black tracking-widest border-slate-700 dark:border-slate-200 rounded-xl text-xs text-white dark:text-slate-900 hover:bg-white/10">
                                                View Analytics
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </RoleGuard>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
