'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Loader2, Calculator, BookOpen, Brain, MessageSquare, Lightbulb, RotateCcw, Mic, MicOff, Square } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

type SubjectMode = 'general' | 'maths' | 'english' | 'quantitative' | 'verbal';

const SUBJECT_CONFIG: Record<SubjectMode, { label: string; icon: typeof Calculator; color: string; bgColor: string; prompt: string }> = {
    general: {
        label: 'General Help',
        icon: Lightbulb,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 border-blue-200',
        prompt: `You are NeuroBot, a friendly AI homework assistant for NeuroSpace. Help parents explain any subject to their children with special needs. Break down concepts simply, use examples, and be encouraging. Adapt explanations for children with physical/motor disabilities who may have high cognitive potential.`
    },
    maths: {
        label: 'Mathematics',
        icon: Calculator,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 border-emerald-200',
        prompt: `You are NeuroBot, a mathematics tutor for NeuroSpace. Help parents teach their children math concepts. 

APPROACH:
- Break problems into small, numbered steps
- Use visual descriptions (imagine a number line, picture 3 apples)
- Explain the "why" behind formulas
- Offer multiple solving methods
- Use real-world examples
- For word problems, identify key information first
- Be patient and encouraging

Cover: arithmetic, fractions, decimals, percentages, algebra basics, geometry, measurement, time, money, and problem-solving strategies.`
    },
    english: {
        label: 'English',
        icon: BookOpen,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 border-purple-200',
        prompt: `You are NeuroBot, an English language tutor for NeuroSpace. Help parents teach reading, writing, grammar, and comprehension.

APPROACH:
- Explain grammar rules with clear examples
- Help with spelling patterns and tricks
- Guide essay/story structure (beginning, middle, end)
- Teach punctuation with simple rules
- Help with reading comprehension strategies
- Vocabulary building with context
- Creative writing prompts and feedback

Adapt for children who may use voice-to-text or have motor challenges affecting handwriting.`
    },
    quantitative: {
        label: 'Quantitative Reasoning',
        icon: Brain,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 border-orange-200',
        prompt: `You are NeuroBot, a quantitative reasoning tutor for NeuroSpace. Help parents prepare their children for reasoning tests and develop logical thinking.

COVER:
- Number sequences and patterns
- Mathematical word problems
- Data interpretation (tables, charts, graphs)
- Ratio and proportion problems
- Logical number puzzles
- Estimation and approximation
- Speed, distance, time problems
- Percentage and profit/loss

APPROACH:
- Teach pattern recognition strategies
- Show systematic problem-solving methods
- Use elimination techniques
- Practice with timed strategies
- Build confidence with progressive difficulty`
    },
    verbal: {
        label: 'Verbal Reasoning',
        icon: MessageSquare,
        color: 'text-rose-600',
        bgColor: 'bg-rose-50 border-rose-200',
        prompt: `You are NeuroBot, a verbal reasoning tutor for NeuroSpace. Help parents develop their child's language logic and comprehension skills.

COVER:
- Synonyms and antonyms
- Analogies (A is to B as C is to ?)
- Odd one out exercises
- Word codes and letter patterns
- Reading comprehension with inference
- Sentence completion
- Logical deduction from text
- Vocabulary in context

APPROACH:
- Teach word relationship patterns
- Build vocabulary systematically
- Practice elimination strategies
- Develop inference skills
- Use memory techniques for word patterns`
    }
};

export default function AIAgentPage() {
    const [mode, setMode] = useState<SubjectMode>('general');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const config = SUBJECT_CONFIG[mode];

    // Reset chat when mode changes
    useEffect(() => {
        const welcomeMessages: Record<SubjectMode, string> = {
            general: "👋 Hi! I'm NeuroBot, your homework helper. I can assist with any subject - just ask!\n\n🎤 Tip: Click the microphone to speak your question!\n\nSelect a subject above for specialized help.",
            maths: "🔢 Math Mode activated! I'll help break down problems step-by-step.\n\nYou can:\n• Paste a math problem for me to solve & explain\n• Ask how to teach a concept (fractions, multiplication, etc.)\n• Get practice problems for your child\n\n🎤 Use voice input for hands-free help!",
            english: "📚 English Mode activated! Let's work on reading, writing, and grammar.\n\nI can help with:\n• Grammar rules and examples\n• Spelling and vocabulary\n• Essay structure and writing tips\n• Reading comprehension strategies\n\n🎤 Speak your question using the microphone!",
            quantitative: "🧩 Quantitative Reasoning Mode! Let's build those problem-solving skills.\n\nI'll help with:\n• Number patterns and sequences\n• Word problems and data interpretation\n• Logical puzzles and reasoning\n• Test preparation strategies\n\n🎤 Voice input available!",
            verbal: "💬 Verbal Reasoning Mode! Time to strengthen language logic.\n\nI can help with:\n• Analogies and word relationships\n• Synonyms, antonyms, odd-one-out\n• Comprehension and inference\n• Vocabulary building\n\n🎤 Try speaking your question!"
        };

        setMessages([{ role: 'assistant', content: welcomeMessages[mode] }]);
    }, [mode]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Voice Recording Functions
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                stream.getTracks().forEach(track => track.stop());
                await transcribeAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const transcribeAudio = async (audioBlob: Blob) => {
        setIsTranscribing(true);
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');

            const response = await fetch('/api/speech-to-text', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.error) {
                console.error('Transcription error:', data.error);
                alert('Could not transcribe audio. Please try again or type your message.');
            } else if (data.text) {
                setInput(data.text);
            }
        } catch (error) {
            console.error('Transcription error:', error);
            alert('Failed to transcribe audio. Please try again.');
        } finally {
            setIsTranscribing(false);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai-agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: config.prompt },
                        ...messages.map(m => ({ role: m.role, content: m.content })),
                        { role: 'user', content: userMessage }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "I'm having trouble connecting. Please ensure GROQ_API_KEY is set in your environment."
                }]);
            } else {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.result
                }]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I couldn't process your request. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMode(mode); // Triggers useEffect to reset
    };

    const suggestedQuestions: Record<SubjectMode, string[]> = {
        general: [
            "How do I explain homework to my child?",
            "Tips for learning with motor challenges",
            "How to make studying fun?",
            "Help with tonight's homework"
        ],
        maths: [
            "Explain fractions simply",
            "How to teach multiplication tables",
            "Solve: 24 ÷ 6 + 3 × 2",
            "Give me a word problem for practice"
        ],
        english: [
            "When to use 'their' vs 'there'",
            "How to structure a paragraph",
            "Explain past tense rules",
            "Help with spelling strategies"
        ],
        quantitative: [
            "Find the pattern: 2, 6, 12, 20, ?",
            "Tips for solving word problems",
            "Practice ratio questions",
            "How to read data tables"
        ],
        verbal: [
            "Hot is to Cold as Day is to ?",
            "Practice synonym questions",
            "Odd one out strategies",
            "Help with comprehension"
        ]
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">AI Homework Helper</h1>
                    <p className="text-slate-500">Help your child with any subject • Voice enabled 🎤</p>
                </div>
                <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Online
                </div>
            </div>

            {/* Subject Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {(Object.keys(SUBJECT_CONFIG) as SubjectMode[]).map((subject) => {
                    const cfg = SUBJECT_CONFIG[subject];
                    const Icon = cfg.icon;
                    const isActive = mode === subject;
                    return (
                        <button
                            key={subject}
                            onClick={() => setMode(subject)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border ${
                                isActive 
                                    ? `${cfg.bgColor} ${cfg.color} border-current` 
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {cfg.label}
                        </button>
                    );
                })}
                <button
                    onClick={clearChat}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all ml-auto"
                    title="Clear chat"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            {/* Chat Container */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                    message.role === 'user'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-800'
                                }`}
                            >
                                {message.role === 'assistant' && (
                                    <div className={`flex items-center gap-2 mb-2 ${config.color}`}>
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-xs font-bold">NeuroBot • {config.label}</span>
                                    </div>
                                )}
                                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-100 rounded-2xl px-4 py-3">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length <= 2 && (
                    <div className="px-6 pb-4">
                        <p className="text-xs text-slate-400 mb-2">Try asking:</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestedQuestions[mode].map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(q)}
                                    className={`px-3 py-1.5 border rounded-full text-xs transition-colors ${config.bgColor} ${config.color} hover:opacity-80`}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex gap-3">
                        {/* Voice Input Button */}
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            disabled={isTranscribing || isLoading}
                            className={`px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center ${
                                isRecording
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : isTranscribing
                                    ? 'bg-slate-200 text-slate-400'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                            title={isRecording ? 'Stop recording' : 'Start voice input'}
                        >
                            {isTranscribing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : isRecording ? (
                                <Square className="w-5 h-5" />
                            ) : (
                                <Mic className="w-5 h-5" />
                            )}
                        </button>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={isRecording ? 'Recording... click stop when done' : isTranscribing ? 'Transcribing...' : `Ask about ${config.label.toLowerCase()}...`}
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder-slate-400"
                            disabled={isLoading || isRecording}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading || isRecording}
                            className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
                        >
                            <Send className="w-4 h-4" />
                            Send
                        </button>
                    </div>
                    
                    {/* Recording indicator */}
                    {isRecording && (
                        <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            Recording... Speak now, then click stop
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
