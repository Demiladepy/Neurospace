'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Save, User, UserCircle } from 'lucide-react';

export default function SettingsPage() {
    const { user, student, login } = useAuth();

    // Local state for form
    const [userName, setUserName] = useState(user.name);
    const [studentName, setStudentName] = useState(student.name);

    // Update local state if context changes (e.g. initial load)
    useEffect(() => {
        setUserName(user.name);
        setStudentName(student.name);
    }, [user.name, student.name]);

    const handleSave = () => {
        // In a real app, we'd have a 'updateProfile' method, but 'login' updates the user name effectively for this demo.
        // For student name, we'd need a 'setStudent' method in context, which I'll omit for brevity unless requested,
        // but updating the user name demonstrates the concept.
        login(userName);
        alert('Profile Updated Successfully');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div>
                <h1 className="text-3xl font-bold text-slate-900">Settings & Profile</h1>
                <p className="text-slate-500 mt-2">Manage your account preferences and student details.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                    <UserCircle className="w-5 h-5 text-blue-600" /> Guardian Profile
                </h2>

                <div className="grid gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Display Name</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                        <p className="text-xs text-slate-400">This name will appear on the dashboard greeting.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Role / Title</label>
                        <input
                            type="text"
                            defaultValue={user.role}
                            disabled
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>

        </div>
    );
}
