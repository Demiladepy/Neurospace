'use client';

import { motion } from 'framer-motion';
import { X, HelpCircle, HardDrive, GraduationCap, Stethoscope } from 'lucide-react';

interface ConceptModalProps {
    onDismiss: () => void;
}

export default function ConceptModal({ onDismiss }: ConceptModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-400" />
                        Concept Defense
                    </h2>
                    <button onClick={onDismiss} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">

                    {/* Question 1: Teacher */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-amber-400 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            The "Teacher" Defense
                        </h3>
                        <p className="text-sm text-slate-300 italic">"Teachers are overworked. How do you integrate this?"</p>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-slate-200 text-sm leading-relaxed">
                                <strong>The "Classroom Node" Model:</strong> NeuroSpace doesn't require the teacher to scan every student.
                                Instead, it runs on a single <strong>Classroom Tablet</strong> passed around during "quiet time" or focused work.
                                Additionally, our <strong>"Broadcast Mode"</strong> allows the teacher to snap ONE photo of the board, and the AI sends simplified, personalized versions to student devices instantly.
                            </p>
                        </div>
                    </div>

                    {/* Question 2: Data */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                            <HardDrive className="w-5 h-5" />
                            The "Data" Defense
                        </h3>
                        <p className="text-sm text-slate-300 italic">"Won't this finish their 500MB data?"</p>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-slate-200 text-sm leading-relaxed">
                                <strong>Edge-First Architecture:</strong> We prioritize <strong>Local Processing</strong> or "TinyML" models for initial scanning.
                                Images are compressed 10x before upload.
                                Voice notes are processed as text-only logs where possible.
                                <strong>Offline Mode:</strong> Core "Spiderman" templates are pre-downloaded, so rewriting often uses minimal tokens (text-only) rather than heavy media transfers.
                            </p>
                        </div>
                    </div>

                    {/* Question 3: Expertise */}
                    <div className="space-y-2">
                        <h3 className="font-bold text-purple-400 flex items-center gap-2">
                            <Stethoscope className="w-5 h-5" />
                            The "Liability" Defense
                        </h3>
                        <p className="text-sm text-slate-300 italic">"Llama is not a doctor. What about liability?"</p>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-slate-200 text-sm leading-relaxed">
                                <strong>"Copilot, Not Captain":</strong> NeuroSpace operates strictly within <strong>Non-Medical Guidelines</strong>.
                                It suggests generic sensory breaks (breathing, silence) approved by partnered child psychologists.
                                It has a rigid <strong>Safety Layer</strong> that flags "Red Zone" behaviors and immediately directs the parent to call a professional, refusing to intervene further. We are a tool for <em>regulation</em>, not <em>treatment</em>.
                            </p>
                        </div>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    );
}
