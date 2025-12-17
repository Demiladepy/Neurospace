'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate extracting name from email for demo "Realism"
        // e.g. "sarah@example.com" -> "Sarah"
        const namePart = email.split('@')[0];
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

        login(formattedName || "Guardian");

        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 relative z-10">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            N
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">NeuroSpace</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 text-sm mt-2">Enter your credentials to access the guardian portal.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                placeholder="parent@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                            <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            Remember me
                        </label>
                        <a href="#" className="font-bold text-blue-600 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-4"
                    >
                        Sign In <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    Don&apos;t have an account? <Link href="/signup" className="font-bold text-blue-600 hover:underline">Sign up for free</Link>
                </div>
            </div>

        </div>
    );
}
