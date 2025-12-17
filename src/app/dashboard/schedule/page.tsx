'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, X, ChevronLeft, ChevronRight, GraduationCap, Heart, Brain, Sparkles } from 'lucide-react';

interface ScheduleEvent {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    time: string;
    duration: number; // minutes
    type: 'learning' | 'therapy' | 'assessment' | 'break';
    notes?: string;
}

const EVENT_TYPES = {
    learning: { label: 'Learning Session', color: 'bg-blue-500', bgLight: 'bg-blue-50', text: 'text-blue-600', icon: GraduationCap },
    therapy: { label: 'Therapy', color: 'bg-purple-500', bgLight: 'bg-purple-50', text: 'text-purple-600', icon: Heart },
    assessment: { label: 'Assessment', color: 'bg-orange-500', bgLight: 'bg-orange-50', text: 'text-orange-600', icon: Brain },
    break: { label: 'Rest Break', color: 'bg-emerald-500', bgLight: 'bg-emerald-50', text: 'text-emerald-600', icon: Sparkles },
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const STORAGE_KEY = 'neurospace_schedule_events';

// Default sample events
const DEFAULT_EVENTS: ScheduleEvent[] = [
    { id: '1', title: 'Math Practice', date: new Date().toISOString().split('T')[0], time: '09:00', duration: 45, type: 'learning', notes: 'Focus on fractions' },
    { id: '2', title: 'Speech Therapy', date: new Date().toISOString().split('T')[0], time: '14:00', duration: 60, type: 'therapy' },
    { id: '3', title: 'Afternoon Rest', date: new Date().toISOString().split('T')[0], time: '15:30', duration: 30, type: 'break' },
];

export default function SchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load events from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setEvents(JSON.parse(stored));
        } else {
            setEvents(DEFAULT_EVENTS);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EVENTS));
        }
        setIsLoaded(true);
    }, []);

    // Save events to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        }
    }, [events, isLoaded]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEvent, setNewEvent] = useState<Partial<ScheduleEvent>>({
        title: '',
        date: selectedDate,
        time: '09:00',
        duration: 30,
        type: 'learning',
        notes: '',
    });

    // Calendar helpers
    const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    const getEventsForDate = (dateStr: string) => events.filter(e => e.date === dateStr);

    const formatDateStr = (year: number, month: number, day: number) => 
        `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const addEvent = () => {
        if (!newEvent.title || !newEvent.date || !newEvent.time) return;
        
        const event: ScheduleEvent = {
            id: Date.now().toString(),
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            duration: newEvent.duration || 30,
            type: newEvent.type as ScheduleEvent['type'],
            notes: newEvent.notes,
        };
        
        setEvents([...events, event]);
        setShowAddModal(false);
        setNewEvent({ title: '', date: selectedDate, time: '09:00', duration: 30, type: 'learning', notes: '' });
    };

    const deleteEvent = (id: string) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const selectedDateEvents = getEventsForDate(selectedDate).sort((a, b) => a.time.localeCompare(b.time));

    // Build calendar grid
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const calendarDays: (number | null)[] = [];
    
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Schedule & Calendar</h1>
                    <p className="text-slate-500">Manage learning sessions and therapy appointments</p>
                </div>
                <button
                    onClick={() => {
                        setNewEvent({ ...newEvent, date: selectedDate });
                        setShowAddModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Event
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900">
                            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronLeft className="w-5 h-5 text-slate-600" />
                            </button>
                            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                <ChevronRight className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map(day => (
                            <div key={day} className="text-center text-sm font-medium text-slate-400 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, idx) => {
                            if (day === null) return <div key={idx} className="aspect-square" />;
                            
                            const dateStr = formatDateStr(currentDate.getFullYear(), currentDate.getMonth(), day);
                            const dayEvents = getEventsForDate(dateStr);
                            const isSelected = dateStr === selectedDate;
                            const isToday = dateStr === new Date().toISOString().split('T')[0];

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedDate(dateStr)}
                                    className={`aspect-square p-1 rounded-xl transition-all relative ${
                                        isSelected
                                            ? 'bg-blue-600 text-white'
                                            : isToday
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'hover:bg-slate-50 text-slate-700'
                                    }`}
                                >
                                    <span className="text-sm font-medium">{day}</span>
                                    {dayEvents.length > 0 && (
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                            {dayEvents.slice(0, 3).map((e, i) => (
                                                <span
                                                    key={i}
                                                    className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : EVENT_TYPES[e.type].color}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-4">
                        {Object.entries(EVENT_TYPES).map(([key, val]) => (
                            <div key={key} className="flex items-center gap-2 text-sm text-slate-600">
                                <span className={`w-3 h-3 rounded-full ${val.color}`} />
                                {val.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Day Events */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">
                                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' })}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {selectedDateEvents.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No events scheduled</p>
                            <button
                                onClick={() => {
                                    setNewEvent({ ...newEvent, date: selectedDate });
                                    setShowAddModal(true);
                                }}
                                className="mt-3 text-blue-600 text-sm font-medium hover:underline"
                            >
                                + Add an event
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {selectedDateEvents.map(event => {
                                const typeConfig = EVENT_TYPES[event.type];
                                const Icon = typeConfig.icon;
                                return (
                                    <div
                                        key={event.id}
                                        className={`p-4 rounded-xl border ${typeConfig.bgLight} border-slate-100 group relative`}
                                    >
                                        <button
                                            onClick={() => deleteEvent(event.id)}
                                            className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-white rounded transition-all"
                                        >
                                            <X className="w-4 h-4 text-slate-400" />
                                        </button>
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 ${typeConfig.bgLight} ${typeConfig.text} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-slate-900 text-sm">{event.title}</h4>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {event.time} • {event.duration} min
                                                </p>
                                                {event.notes && (
                                                    <p className="text-xs text-slate-400 mt-1 truncate">{event.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Event Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Add Event</h2>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                    placeholder="e.g., Math Practice"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(EVENT_TYPES).map(([key, val]) => (
                                        <button
                                            key={key}
                                            onClick={() => setNewEvent({ ...newEvent, type: key as ScheduleEvent['type'] })}
                                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                                                newEvent.type === key
                                                    ? `${val.bgLight} ${val.text} border-current`
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                            }`}
                                        >
                                            {val.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={newEvent.date}
                                        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                                    <input
                                        type="time"
                                        value={newEvent.time}
                                        onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                                <select
                                    value={newEvent.duration}
                                    onChange={e => setNewEvent({ ...newEvent, duration: Number(e.target.value) })}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={15}>15 min</option>
                                    <option value={30}>30 min</option>
                                    <option value={45}>45 min</option>
                                    <option value={60}>1 hour</option>
                                    <option value={90}>1.5 hours</option>
                                    <option value={120}>2 hours</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Notes (optional)</label>
                                <input
                                    type="text"
                                    value={newEvent.notes}
                                    onChange={e => setNewEvent({ ...newEvent, notes: e.target.value })}
                                    placeholder="Any additional notes..."
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addEvent}
                                disabled={!newEvent.title}
                                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 font-medium"
                            >
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
