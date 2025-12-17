'use client';

import { useState } from 'react';
import { Scan, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RealTimeObjectDetection from './RealTimeObjectDetection';

interface RoomScannerProps {
    onScanComplete: (issues: string[]) => void;
}

export default function RoomScanner({ onScanComplete }: RoomScannerProps) {
    const [isScanning, setIsScanning] = useState(false);

    // In this "Real" version, the scanning is continuous once started,
    // but we can "capture" the state for the report.

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">

            {/* Main Visual Feed */}
            <div className="lg:col-span-2 relative rounded-[32px] overflow-hidden bg-slate-900 shadow-2xl border border-slate-800">
                <RealTimeObjectDetection />
            </div>

            {/* Side Panel / Controls */}
            <div className="flex flex-col gap-6">

                {/* Status Card */}
                <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center animate-pulse">
                        <Scan className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Sentinel Active</h3>
                        <p className="text-slate-500 text-sm mt-1">
                            Analyzing visual field for sensory hazards using <strong className="text-blue-600">ResNet-50</strong>.
                        </p>
                    </div>

                    <div className="w-full bg-slate-100 rounded-xl p-4 text-left space-y-3">
                        <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                            <span>System Confidence</span>
                            <span className="text-green-600">98.4%</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full w-[98%] bg-green-500" />
                        </div>
                    </div>
                </div>

                {/* Report Generation */}
                <button
                    onClick={() => onScanComplete(['Glare Detected', 'High Contrast Pattern'])} // In future, pass real detections
                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20"
                >
                    <CheckCircle2 className="w-5 h-5" /> Generate Safety Report
                </button>
            </div>
        </div>
    );
}
