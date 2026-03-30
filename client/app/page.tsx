'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain,
  FileText,
  MessageSquare,
  BarChart,
  Map,
  LayoutDashboard,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

// ================= NAVBAR =================
function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
      <h1 className="text-xl font-bold">AI Prep</h1>
      <div className="space-x-6">
        <Link href="/login">Login</Link>
        <Link
          href="/register"
          className="bg-white text-black px-4 py-2 rounded-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

// ================= HERO =================
function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-20 px-6"
    >
      <h1 className="text-5xl font-bold mb-6">
        Crack Your Dream Job with <span className="text-blue-500">AI</span>
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto mb-8">
        Analyze your resume, practice mock interviews, and get personalized
        roadmaps.
      </p>
      <div className="space-x-4">
        <Link href="/login" className="bg-blue-500 px-6 py-3 rounded-lg">
          Get Started
        </Link>
        <button className="border border-gray-600 px-6 py-3 rounded-lg">
          Watch Demo
        </button>
      </div>
    </motion.div>
  );
}

// ================= PROBLEM =================
function Problem() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-8 text-center"
    >
      <h2 className="text-3xl font-bold mb-8">Why Students Struggle?</h2>
      <div className="grid md:grid-cols-3 gap-6 text-gray-400">
        <div>❌ No feedback on resume</div>
        <div>❌ No real interview practice</div>
        <div>❌ Confused what to study</div>
      </div>
    </motion.div>
  );
}

// ================= FEATURES =================
const featureData = [
  {
    icon: FileText,
    title: 'Resume Analyzer',
    desc: 'Upload resume → Get skills, missing skills, weak areas',
  },
  {
    icon: Brain,
    title: 'AI Interview Generator',
    desc: 'Role-based smart questions (Frontend / Backend / SDE)',
  },
  {
    icon: MessageSquare,
    title: 'Mock Interview Chatbot',
    desc: 'Real-time AI interviewer like real interview',
  },
  {
    icon: BarChart,
    title: 'AI Feedback System',
    desc: 'Communication, technical & confidence score',
  },
  {
    icon: Map,
    title: 'Roadmap Generator',
    desc: 'Week-by-week personalized learning plan',
  },
  {
    icon: LayoutDashboard,
    title: 'Smart Dashboard',
    desc: 'All tools & progress tracking in one place',
  },
];

function Features() {
  return (
    <div className="py-20 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {featureData.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-900 rounded-xl border border-gray-800 cursor-pointer"
            >
              <Icon className="mb-4 text-blue-500" size={30} />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ================= HOW IT WORKS =================
function HowItWorks() {
  const steps = [
    'Upload Resume',
    'Get AI Analysis',
    'Start Interview',
    'Get Feedback',
    'Follow Roadmap',
  ];

  return (
    <div className="py-20 px-8 text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>
      <div className="grid md:grid-cols-5 gap-4 text-gray-400">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-gray-900 rounded-lg border border-gray-800"
          >
            {step}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ================= CTA =================
function CTA() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="py-20 text-center"
    >
      <h2 className="text-3xl font-bold mb-6">
        Start Your AI Interview Journey 🚀
      </h2>
      <Link href="/login" className="bg-blue-500 px-6 py-3 rounded-lg">
        Get Started
      </Link>
    </motion.div>
  );
}

// ================= FOOTER =================
function Footer() {
  return (
    <div className="py-6 text-center text-gray-500 border-t border-gray-800">
      © 2026 AI Prep. All rights reserved.
    </div>
  );
}

// ✅ INSTALL REQUIRED PACKAGES:
// npm install framer-motion lucide-react

// Redux will be integrated later in dashboard/auth
