'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

interface Issue {
    id: number;
    label: string;
    action: string;
}

interface ActionChecklistProps {
    issues: Issue[];
    onComplete: () => void;
}

export default function ActionChecklist({ issues, onComplete }: ActionChecklistProps) {
    const [completedIds, setCompletedIds] = useState<number[]>([]);

    const toggleIssue = (id: number) => {
        if (completedIds.includes(id)) {
            setCompletedIds(completedIds.filter(i => i !== id));
        } else {
            setCompletedIds([...completedIds, id]);
        }
    };

    const allDone = completedIds.length === issues.length;

    return (
        <div className="h-full flex flex-col">
            {/* Alert Card */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-orange-800 text-lg">Adjustments Needed</h3>
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-orange-700/80 text-sm leading-relaxed">
                    The Sentinel AI detected <strong className="text-orange-800">{issues.length} potential distractions</strong> in the learning area.
                </p>
            </div>

            {/* Checklist */}
            <div className="flex-1 space-y-3 mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Findings</h4>
                {issues.map((issue) => {
                    const isDone = completedIds.includes(issue.id);
                    return (
                        <div
                            key={issue.id}
                            onClick={() => toggleIssue(issue.id)}
                            className={clsx(
                                "p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 group relative overflow-hidden",
                                isDone ? "bg-slate-50 border-slate-200" : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md"
                            )}
                        >
                            <div className={clsx(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                                isDone ? "bg-green-500 border-green-500 text-white" : "border-slate-300 bg-white group-hover:border-blue-400"
                            )}>
                                {isDone && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div>
                                <p className={clsx("text-sm font-semibold transition-colors", isDone ? "text-slate-400 line-through" : "text-slate-800")}>
                                    {issue.action}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">{issue.label}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Action Button */}
            <button
                onClick={onComplete}
                disabled={!allDone}
                className={clsx(
                    "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                    allDone
                        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
            >
                Proceed to Learning <ArrowRight className="w-4 h-4" />
            </button>

        </div>
    );
}
