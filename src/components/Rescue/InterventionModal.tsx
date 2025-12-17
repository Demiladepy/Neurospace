'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Pause, Play, X } from 'lucide-react';

interface InterventionModalProps {
    onDismiss: () => void;
}

export default function InterventionModal({ onDismiss }: InterventionModalProps) {
    // Real-Time Clock State
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [isPlaying, setIsPlaying] = useState(true);

    // Timer Logic
    useEffect(() => {
        if (!isPlaying || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    // Formatting Time
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    // Progress Bar for Audio
    const totalDuration = 180; // 3 mins simulated audio
    const currentAudioTime = 120 - timeLeft; // Simplistic sync
    const progressPercent = (currentAudioTime / totalDuration) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-50/95 backdrop-blur-md flex flex-col items-center justify-center p-8 overflow-y-auto"
        >

            {/* Top Banner */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-10">
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                    <Pause className="w-4 h-4" fill="currentColor" />
                    Intervention Active
                </div>
                <button onClick={onDismiss} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-500" />
                </button>
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center"
            >

                {/* Visualizer */}
                <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-slate-100 relative overflow-hidden group">
                    <div className="aspect-[4/3] rounded-[24px] bg-gradient-to-br from-teal-400 to-blue-500 overflow-hidden relative flex items-center justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1518182170546-07aa6ddaa354?q=80&w=2600&auto=format&fit=crop"
                            alt="Calm Ocean"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
                        />

                        {/* Breathing Animation - Synced to 4-7-8 method (approx 19s cycle here visually simplified) */}
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center relative z-10"
                        >
                            <div className="w-16 h-16 bg-white/40 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Controls */}
                <div className="space-y-8">
                    <div className="text-center md:text-left space-y-4">
                        <h1 className="text-5xl font-bold text-slate-900 tracking-tight">Time to Recharge</h1>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            Guide the student through <strong className="text-blue-600">Deep Pressure Massage</strong>.
                            Watch for lowered shoulders and slower breathing.
                        </p>
                    </div>

                    {/* Real Timer */}
                    <div className="bg-slate-100 rounded-3xl p-8 flex items-center justify-center gap-4">
                        <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-200 min-w-[120px] text-center">
                            <span className="text-5xl font-bold text-blue-600 font-mono">{minutes}</span>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Minutes</div>
                        </div>
                        <span className="text-4xl text-slate-300 font-bold">:</span>
                        <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-200 min-w-[120px] text-center">
                            <span className="text-5xl font-bold text-blue-600 font-mono">{seconds}</span>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Seconds</div>
                        </div>
                    </div>

                    {/* Audio Player Control */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                            <Volume2 className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">Calming Ocean Sounds</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-slate-400">
                                    {Math.floor(currentAudioTime / 60)}:{((currentAudioTime % 60) + '').padStart(2, '0')}
                                </span>
                                <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-blue-500 rounded-full"
                                        animate={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-slate-400">3:00</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                        >
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                        </button>
                    </div>

                    <button
                        onClick={onDismiss}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Resume Learning Journey
                    </button>
                </div>

            </motion.div>
        </motion.div>
    );
}
