"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/lib/auth/roles";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import TeacherDashboard from "./teacher/page";
import AdminDashboard from "./admin/page";

export default function DashboardPage() {
    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }

        try {
            const user = JSON.parse(storedUser);
            setRole(user.role?.toUpperCase() as Role);
        } catch (e) {
            console.error("Failed to parse user", e);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Role-based rendering
    switch (role) {
        case "ADMIN":
            return <AdminDashboard />;
        case "TEACHER":
            return <TeacherDashboard />;
        case "STUDENT":
        default:
            return <StudentDashboard />;
    }
}
