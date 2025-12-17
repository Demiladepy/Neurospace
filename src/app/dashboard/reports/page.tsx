export default function ReportsPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
            <p className="text-slate-500 max-w-md">Track progress, engagement levels, and intervention success rates. <br /> This module is coming in the next update.</p>
        </div>
    );
}
