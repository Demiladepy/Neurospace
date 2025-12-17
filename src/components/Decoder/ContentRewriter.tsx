'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, RefreshCw, Key, Check, Laptop2 } from 'lucide-react';

interface ContentRewriterProps {
    onComplete?: () => void;
}

export default function ContentRewriter({ onComplete }: ContentRewriterProps) {
    const [topic, setTopic] = useState('Photosynthesis');
    const [originalText, setOriginalText] = useState('Photosynthesis is the process used by plants, algae and certain bacteria to harness energy from sunlight and turn it into chemical energy.');
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // API State
    const [apiKey, setApiKey] = useState('');
    const [showKeyInput, setShowKeyInput] = useState(false);
    const [useLocal, setUseLocal] = useState(false);

    const handleRewrite = async () => {
        setIsLoading(true);
        setGeneratedText('');

        try {
            const prompt = `Rewrite this text about "${topic}" to be super simple and fun for a 3rd grader: "${originalText}"`;

            const res = await fetch('/api/rewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, apiKey, useLocal })
            });

            const data = await res.json();

            if (data.error) {
                setGeneratedText(`Error: ${data.error}`);
                if (!useLocal) setShowKeyInput(true);
            } else {
                simulateTyping(data.result);
                if (onComplete) onComplete();
            }
        } catch (e) {
            setGeneratedText("Failed to connect to AI Service.");
        } finally {
            setIsLoading(false);
        }
    };

    const simulateTyping = (text: string) => {
        let i = 0;
        const interval = setInterval(() => {
            setGeneratedText(text.slice(0, i + 1));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 15); // Faster typing
    };

    return (
        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-xl min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                        <Wand2 className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold text-slate-900">Llama 3 Decoder</h2>
                            {useLocal && <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold border border-slate-200">LOCAL</span>}
                        </div>
                        <p className="text-slate-500 text-sm">Real-Time AI Simplification</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setUseLocal(!useLocal)}
                        className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all ${useLocal ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                        title="Use Local Ollama Instance"
                    >
                        <Laptop2 className="w-3 h-3" /> {useLocal ? 'Local Mode On' : 'Run Locally'}
                    </button>

                    {!useLocal && (
                        <button
                            onClick={() => setShowKeyInput(!showKeyInput)}
                            className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 px-2"
                        >
                            <Key className="w-3 h-3" /> Key
                        </button>
                    )}
                </div>
            </div>

            {/* API Key Input */}
            <AnimatePresence>
                {showKeyInput && !useLocal && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-6 overflow-hidden"
                    >
                        <div className="flex gap-2">
                            <input
                                type="password"
                                placeholder="sk-groq-..."
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                            />
                            <button
                                onClick={() => setShowKeyInput(false)}
                                className="px-4 bg-green-100 text-green-700 rounded-xl font-bold text-sm"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1 ml-1">
                            <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-blue-500 hover:underline">
                                Get Free Key &rarr;
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-8 flex-1">
                {/* Input Side */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Original Content</label>
                    <input
                        className="w-full font-bold text-xl border-b-2 border-slate-100 pb-2 focus:border-blue-500 outline-none transition-colors"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    <textarea
                        className="w-full h-64 p-4 bg-slate-50 rounded-2xl border-none resize-none focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-600 leading-relaxed"
                        value={originalText}
                        onChange={(e) => setOriginalText(e.target.value)}
                    />
                </div>

                {/* Output Side */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-purple-600 uppercase tracking-wider flex items-center gap-2">
                        {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                        AI Adapted Output
                    </label>
                    <div className="w-full h-64 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 relative overflow-hidden">
                        {generatedText ? (
                            <p className="text-lg text-slate-800 leading-relaxed font-medium">
                                {generatedText}
                            </p>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-sm p-8 text-center">
                                <span className="mb-2">Ready to simplify with {useLocal ? 'Local Llama' : 'Meta Llama 3'}</span>
                                {useLocal && <span className="text-xs text-slate-300">Requires `ollama run llama3` in terminal</span>}
                            </div>
                        )}

                        {/* Spiderman Highlighter Effect Overlay */}
                        <div className="absolute top-0 right-0 p-4">
                            <div className="w-8 h-8 rounded-full bg-white/50 backdrop-blur border border-white shadow-sm flex items-center justify-center">
                                <span className="text-xs">🕷️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={handleRewrite}
                disabled={isLoading}
                className="mt-8 w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Processing...' : `Simplify with ${useLocal ? 'Local Llama' : 'Meta Llama 3'}`}
            </button>
        </div>
    );
}
