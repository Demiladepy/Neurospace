'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanText, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import ContentRewriter from './ContentRewriter';
import { textbookContent } from '@/lib/mockData';

interface TextbookScannerProps {
    onScanComplete: () => void;
}

export default function TextbookScanner({ onScanComplete }: TextbookScannerProps) {
    const [isScanning, setIsScanning] = useState(false);
    const [hasResult, setHasResult] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setHasResult(true);
            onScanComplete();
        }, 2000);
    };

    if (hasResult) {
        return (
            <ContentRewriter
                original={textbookContent.original}
                personalized={textbookContent.personalized}
            />
        );
    }

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 min-h-[600px] flex flex-col items-center justify-center text-center space-y-8">

            <div className="space-y-4 max-w-lg">
                <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto text-purple-600 mb-6">
                    <ScanText className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Scan Learning Material</h2>
                <p className="text-slate-500 text-lg">
                    Upload a photo of the textbook or worksheet. The AI will simplify the language and add personalized examples.
                </p>
            </div>

            <div className="w-full max-w-xl h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-4 hover:border-purple-400 hover:bg-purple-50 transition-colors cursor-pointer group" onClick={handleScan}>
                {isScanning ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                        <span className="font-bold text-purple-700">Processing Content...</span>
                    </div>
                ) : (
                    <>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6 text-purple-500" />
                        </div>
                        <span className="font-bold text-slate-600 group-hover:text-purple-700">Click to Upload or Drag File</span>
                    </>
                )}
            </div>

            <div className="flex gap-4">
                <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider">Supports JPG, PNG</div>
                <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider">Fast-OCR Enabled</div>
            </div>

        </div>
    );
}
