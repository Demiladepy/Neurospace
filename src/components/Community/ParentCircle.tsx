'use client';

import { Users, MessageCircle, ExternalLink } from 'lucide-react';

export default function ParentCircle() {

    // WhatsApp Links (Mock numbers for demo, but format is real)
    const groupLink = "https://chat.whatsapp.com/invite/placeholder";
    const teacherLink = "https://wa.me/15550123456?text=Hi%2C%20I%20have%20a%20question%20about%20Leo%27s%20progress.";

    const handleJoin = () => {
        window.open(groupLink, '_blank');
    };

    const handleChat = () => {
        window.open(teacherLink, '_blank');
    };

    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-[32px] p-6 border border-emerald-100 flex flex-col justify-between h-full group">
            <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                    Verified Community
                </span>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">Parent Circle</h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Connect with 24 other parents in the <strong>Grade 3 Neuro-Support</strong> group.
                </p>
            </div>

            <div className="space-y-3 mt-6">
                <button
                    onClick={handleJoin}
                    className="w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                    Join WhatsApp Group <ExternalLink className="w-4 h-4" />
                </button>

                <button
                    onClick={handleChat}
                    className="w-full py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                    Message Teacher
                </button>
            </div>
        </div>
    );
}
