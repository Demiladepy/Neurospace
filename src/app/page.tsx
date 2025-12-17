'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Brain, HeartPulse, Eye, Mic, Armchair, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">NeuroSpace</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2.5 text-slate-600 font-medium hover:text-blue-600 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="pt-32 pb-16 px-6 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                AI for Physical & Motor Independence
              </div>

              <h1 className="text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Unlock the Brilliant Mind <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500">Prohibited by the Body</span>
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                For students with cerebral palsy, paralysis, and motor challenges.
                We bridge the gap between high cognitive potential and physical limitations through
                voice-first, eye-tracking friendly AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup" className="px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-2xl hover:bg-blue-700 transition-transform hover:scale-105 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2">
                  Start Free Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/login" className="px-8 py-4 bg-white text-slate-700 font-bold text-lg rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center">
                  See It In Action
                </Link>
              </div>

              <div className="pt-8 flex flex-wrap items-center gap-6 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Eye-Tracking Optimized
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Voice-First Control
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Fatigue Monitoring
                </div>
              </div>
            </motion.div>

            {/* Hero Image / Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-50 rounded-[40px] transform rotate-3 scale-105 -z-10" />
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden p-2">
                <img
                  src="/hero-student.png"
                  alt="Student using eye-tracking technology"
                  className="rounded-[24px] w-full h-auto object-cover opacity-90"
                />

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-8 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Gaze Detected</p>
                    <p className="text-xs text-slate-500">Interface Optimized</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-8 bottom-1/3 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Cognition High</p>
                    <p className="text-xs text-slate-500">Motor Load Reduced</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Educational Section: The Physical-Digital Gap */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">The Physical-Digital Gap</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                For millions of students, the barrier isn't intelligence—it's the interface.
                Standard education tools assume fine motor control, leaving physically challenged students exhausted
                from the mere act of <em>accessing</em> learning, rather than <em>doing</em> it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="mb-6 h-48 rounded-2xl overflow-hidden border border-slate-100">
                  <img src="/voice-tech.png" alt="Voice Assurance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Voice-First Interface</h3>
                <p className="text-slate-500">
                  Drastically reduces physical fatigue by replacing keyboard and mouse interactions with natural language commands.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="mb-6 h-48 rounded-2xl overflow-hidden border border-slate-100">
                  <img src="/bio-feedback.png" alt="Bio-Feedback" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Fatigue Management</h3>
                <p className="text-slate-500">
                  We treat physical energy as a finite resource. Our AI monitors for signs of exhaustion to optimize learning windows.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                  <Armchair className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Environmental Control</h3>
                <p className="text-slate-500">
                  Empowers students to control their digital environment without needing complex physical movements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <div className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Technology</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Three powerful AI agents enabling true accessibility.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield, color: 'blue',
                  title: 'Ergonomic Sentinel',
                  desc: 'Scans for postural strain and lighting issues that affect eye-tracking accuracy and comfort.'
                },
                {
                  icon: Brain, color: 'purple',
                  title: 'Assistive Decoder',
                  desc: 'Converts complex workbook activities into voice-selectable choices, removing the need to hold a pen.'
                },
                {
                  icon: HeartPulse, color: 'red',
                  title: 'Bio-Feedback Rescue',
                  desc: 'Monitors breathing and facial tension to detect physical pain or exhaustion before a meltdown occurs.'
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 hover:shadow-xl transition-all group cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-100 text-${feature.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                  <div className={`mt-6 flex items-center gap-2 text-${feature.color}-600 font-bold text-sm`}>
                    Learn more <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-slate-200 rounded text-slate-500 flex items-center justify-center font-bold text-xs">N</div>
            <span className="font-bold text-slate-700">NeuroSpace</span>
          </div>
          <p className="text-slate-400 text-sm mb-8">
            Empowering every student to transcend physical boundaries.
          </p>
          <div className="text-slate-400 text-xs">
            © 2025 NeuroSpace Inc. HIPAA Compliant. Built with 💙 for Accessibility.
          </div>
        </div>
      </footer>

    </div>
  );
}
