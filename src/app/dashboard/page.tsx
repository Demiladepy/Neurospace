'use client';

import { useState } from 'react';
import { ScanFace, Type, Siren, Activity, Sun, Battery, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Component Imports
import RoomScanner from '@/components/Sentinel/RoomScanner';
import TextbookScanner from '@/components/Decoder/TextbookScanner';
import InterventionModal from '@/components/Rescue/InterventionModal';
import ParentCircle from '@/components/Community/ParentCircle';
import { AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const { user, student } = useAuth(); // Use Dynamic Data
    const [activeMode, setActiveMode] = useState<'DASHBOARD' | 'SENTINEL' | 'DECODER'>('DASHBOARD');
    const [isRescueActive, setIsRescueActive] = useState(false);

    // --- Handlers for "Back to Dashboard" simulation ---
    const exitMode = () => setActiveMode('DASHBOARD');

    // --- Render Active Mode content (Simulated Routing) ---
    if (activeMode === 'SENTINEL') {
        return (
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-900">Environment Sentinel</h1>
                    <button onClick={exitMode} className="text-slate-500 hover:text-slate-900">Back to Dashboard</button>
                </div>
                <RoomScanner onScanComplete={() => { }} />
            </div>
        );
    }

    if (activeMode === 'DECODER') {
        return (
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-slate-900">Content Decoder</h1>
                    <button onClick={exitMode} className="text-slate-500 hover:text-slate-900">Back to Dashboard</button>
                </div>
                <TextbookScanner onScanComplete={() => { }} />
            </div>
        );
    }

    // --- Dashboard View (Default) ---
    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Good Morning, {user.name}</h1>
                    <p className="text-slate-500 mt-1">Here is an overview of {student.name}&apos;s session today.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-semibold text-slate-700">System Online</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Student Profile Card */}
                    <div className="dashboard-card flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-white to-blue-50/50">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-orange-200 border-4 border-white shadow-xl overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} alt={student.name} className="w-full h-full" />
                            </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                <h2 className="text-2xl font-bold text-slate-900">{student.name}&apos;s Dashboard</h2>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Ready for Learning</span>
                            </div>
                            <p className="text-slate-500 mb-4">{student.grade} • {student.profileType} Profile</p>

                            <div className="flex gap-8 justify-center md:justify-start">
                                <div>
                                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Focus Level</div>
                                    <div className="font-bold text-slate-900 flex items-center gap-2">
                                        <Battery className="w-4 h-4 text-blue-500" /> High
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Last Session</div>
                                    <div className="font-bold text-slate-900 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" /> 45m Completed
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Mood</div>
                                    <div className="font-bold text-slate-900 flex items-center gap-2">
                                        <Sun className="w-4 h-4 text-orange-500" /> Calm
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors">
                            View Full Profile
                        </button>
                    </div>

                    {/* Control Center */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-500" /> Control Center
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* 1. Sentinel */}
                            <div className="dashboard-card flex flex-col justify-between group">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <ScanFace className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Sentinel Scan</h3>
                                    <p className="text-slate-500 text-sm mb-6">Analyze environment using ResNet-50 Vision.</p>
                                </div>
                                <button
                                    onClick={() => setActiveMode('SENTINEL')}
                                    className="btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    Run Scan <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* 2. Decoder */}
                            <div className="dashboard-card flex flex-col justify-between group">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Type className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Decoder Mode</h3>
                                    <p className="text-slate-500 text-sm mb-6">Simplify text with Llama 3 AI.</p>
                                </div>
                                <button
                                    onClick={() => setActiveMode('DECODER')}
                                    className="btn-secondary w-full flex items-center justify-center gap-2"
                                >
                                    Activate Decoder
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Rescue */}
                    <div className="dashboard-card bg-red-50/50 border-red-100 flex flex-col justify-between group">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Siren className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Rescue Loop</h3>
                            <p className="text-slate-500 text-sm mb-6">Immediate intervention with calming content.</p>
                        </div>
                        <button
                            onClick={() => setIsRescueActive(true)}
                            className="btn-danger-outline w-full flex items-center justify-center gap-2"
                        >
                            Trigger Intervention
                        </button>
                    </div>

                    {/* Community (WhatsApp) */}
                    <ParentCircle />
                </div>
            </div>

            {/* Global Rescue Overlay */}
            <AnimatePresence>
                {isRescueActive && (
                    <InterventionModal onDismiss={() => setIsRescueActive(false)} />
                )}
            </AnimatePresence>

        </div>
    );
}
