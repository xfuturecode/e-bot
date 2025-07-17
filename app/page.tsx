"use client";

import { motion } from "framer-motion";
import { Sparkles, Bot, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-white to-gray-100 min-h-screen font-sans">
      // {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-200 via-purple-200 to-transparent rounded-full blur-3xl opacity-60 animate-pulse" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <Image
            src="/images/ebot-logo.png"
            alt="E-Bot Logo"
            width={120}
            height={120}
            className="mb-6 rounded-full shadow border border-gray-200 bg-white/80 backdrop-blur"
            priority
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight z-10 bg-gradient-to-r from-black via-gray-800 to-purple-700 bg-clip-text text-transparent"
        >
          Your AI Copilot for Productivity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 z-10"
        >
          E-Bot helps you automate tasks, get instant answers, and boost your
          workflow securely.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center z-10"
        >
          <Link
            href="/features"
            className="px-7 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition shadow-lg"
          >
            Explore Features
          </Link>
          <Link
            href="/signup"
            className="px-7 py-3 border border-black text-black rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-3 gap-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-10 flex flex-col items-center border border-gray-100 transition-all"
        >
          <Sparkles className="text-blue-500 mb-4 animate-bounce" size={48} />
          <h2 className="font-bold text-xl mb-2">Instant Answers</h2>
          <p className="text-gray-500 text-center">
            Get quick, accurate responses to your questions anytime.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-10 flex flex-col items-center border border-gray-100 transition-all"
        >
          <Bot className="text-purple-500 mb-4 animate-spin-slow" size={48} />
          <h2 className="font-bold text-xl mb-2">Task Automation</h2>
          <p className="text-gray-500 text-center">
            Automate repetitive tasks and workflows with ease.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-10 flex flex-col items-center border border-gray-100 transition-all"
        >
          <ShieldCheck className="text-green-500 mb-4 animate-pulse" size={48} />
          <h2 className="font-bold text-xl mb-2">Secure & Private</h2>
          <p className="text-gray-500 text-center">
            Your data is protected with industry-leading security.
          </p>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-4xl mx-auto py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          How E-Bot Works
        </motion.h2>
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="space-y-6 text-gray-700 list-decimal list-inside"
        >
          {[
            "Sign up and create your account in seconds.",
            "Ask questions or set up automations via chat.",
            "Let E-Bot handle the rest and boost your productivity!",
          ].map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white/80 rounded-xl px-6 py-4 shadow border border-gray-100"
            >
              {step}
            </motion.li>
          ))}
        </motion.ol>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-semibold mb-4"
        >
          Ready to get started?
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Link
            href="/signup"
            className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition shadow-lg text-lg"
          >
            Create your free account
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm border-t">
        &copy; {new Date().getFullYear()} E-Bot. All rights reserved.
      </footer>
    </main>
  );
}
