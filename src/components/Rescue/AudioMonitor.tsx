'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, AlertOctagon } from 'lucide-react';

interface AudioMonitorProps {
    onStressDetected: () => void;
}

export default function AudioMonitor({ onStressDetected }: AudioMonitorProps) {
    const [levels, setLevels] = useState<number[]>(new Array(10).fill(5));
    const [isListening, setIsListening] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const rafIdRef = useRef<number | null>(null);

    useEffect(() => {
        const updateLevels = () => {
            if (!analyserRef.current || !dataArrayRef.current) return;

            analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

            const newLevels = Array.from(dataArrayRef.current).slice(0, 10).map(val => (val / 255) * 100);
            setLevels(newLevels);

            rafIdRef.current = requestAnimationFrame(updateLevels);
        };

        const initAudio = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 64;

                sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
                sourceRef.current.connect(analyserRef.current);

                const bufferLength = analyserRef.current.frequencyBinCount;
                dataArrayRef.current = new Uint8Array(bufferLength);

                setIsListening(true);
                updateLevels();
            } catch (err) {
                console.error("Microphone access denied:", err);
                setIsListening(false);
            }
        };

        initAudio();

        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-full pl-4 pr-2 py-2 flex items-center gap-4 shadow-2xl">
                <div className="flex items-center gap-2">
                    {isListening ? <Mic className="w-4 h-4 text-emerald-500 animate-pulse" /> : <MicOff className="w-4 h-4 text-slate-400" />}

                    <div className="flex items-end gap-[2px] h-8 w-32">
                        {levels.map((height, i) => (
                            <motion.div
                                key={i}
                                className="w-2 bg-emerald-500 rounded-t-sm"
                                animate={{ height: `${Math.max(height, 10)}%` }}
                                transition={{ type: "tween", ease: "linear", duration: 0.05 }}
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={onStressDetected}
                    className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded-full border border-red-200 transition-colors group"
                    title="Manually Trigger Rescue (Demo)"
                >
                    <AlertOctagon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </div>
    );
}
