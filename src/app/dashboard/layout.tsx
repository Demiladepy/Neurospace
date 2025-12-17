'use client';

import { LayoutDashboard, Calendar, GraduationCap, BarChart3, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/contexts/AuthContext';

// Sidebar Navigation Items
const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
    { icon: GraduationCap, label: 'Students', href: '/dashboard/students' },
    { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, logout } = useAuth(); // Dynamic User

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-100 fixed top-0 bottom-0 left-0 z-50 flex flex-col p-6">
                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        N
                    </div>
                    <span className="text-xl font-bold text-slate-900 tracking-tight">NeuroSpace</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-4 mt-2">Main Menu</div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={twMerge(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-medium transition-colors hover:bg-blue-50 hover:text-blue-600",
                                    isActive && "bg-blue-50 text-blue-600"
                                )}
                            >
                                <item.icon className={clsx("w-5 h-5", isActive ? "text-blue-600" : "text-slate-400")} />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-2 p-2 rounded-xl hover:bg-slate-50 transition-colors group relative">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate">{user.role}</p>
                        </div>

                        <Link
                            href="/"
                            onClick={logout}
                            className="absolute right-2 opacity-0 group-hover:opacity-100 p-2 hover:bg-slate-200 rounded text-slate-500 transition-all"
                            title="Log Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
