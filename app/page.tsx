"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, FileText, BarChart2, CalendarDays, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#blog", label: "Blog" },
  { href: "#changelog", label: "Changelog" },
];

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/ebot-logo.png" alt="Logo" width={36} height={36} className="rounded" />
          <span className="font-bold text-xl tracking-tight text-white">e-Bot</span>
        </Link>
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-medium text-gray-200 hover:text-white px-2 py-1 rounded transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link href="/login">Log In</Link></Button>
          <Button variant="default" asChild><Link href="/signup">Sign Up</Link></Button>
        </div>
      </div>
    </motion.nav>
  );
}

function AvatarsBar() {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className="flex -space-x-2">
        <Image src="/images/avatar1.png" alt="avatar1" width={32} height={32} className="rounded-full border-2 border-black" />
        <Image src="/images/avatar2.png" alt="avatar2" width={32} height={32} className="rounded-full border-2 border-black" />
        <Image src="/images/avatar3.png" alt="avatar3" width={32} height={32} className="rounded-full border-2 border-black" />
        <Image src="/images/avatar4.png" alt="avatar4" width={32} height={32} className="rounded-full border-2 border-black" />
      </div>
      <span className="ml-3 text-sm text-gray-300 font-medium">+245 Students</span>
    </div>
  );
}

export default function Home() {
  const features = [
    {
      icon: <CheckCircle size={28} className="text-violet-600 mr-3 flex-shrink-0" />, label: "Attendance", desc: "Track and manage student attendance easily."
    },
    {
      icon: <FileText size={28} className="text-violet-600 mr-3 flex-shrink-0" />, label: "Exams", desc: "Organize and schedule exams efficiently."
    },
    {
      icon: <BarChart2 size={28} className="text-violet-600 mr-3 flex-shrink-0" />, label: "Results", desc: "View and analyze exam results instantly."
    },
    {
      icon: <DollarSign size={28} className="text-violet-600 mr-3 flex-shrink-0" />, label: "Fees", desc: "Manage and track student fees efficiently."
    },
    {
      icon: <CalendarDays size={28} className="text-violet-600 mr-3 flex-shrink-0" />, label: "Timetable", desc: "Access and update class timetables."
    }
  ];
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen font-sans">
        {/* Hero Section */}
        <header id="hero" className="flex flex-col items-center justify-center min-h-[80vh] py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black via-gray-900 to-gray-950 opacity-80" />
        <motion.div
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
            className="z-10 w-full flex flex-col items-center"
          >
            <AvatarsBar />
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-100 leading-tight">
              Automate everythings<br className="hidden md:block" /> at the Brotherly Training Center
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
             We are a team of students who are passionate about technology and we are here to help you automate your daily tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
                <Button asChild className="flex-1 px-6 py-3 rounded-full bg-gray-900 border border-gray-700 text-gray-200 hover:bg-gray-800 transition font-medium">
                <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="flex-1 px-6 py-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition font-semibold shadow">
                <Link href="/signup">Get started for free</Link>
                </Button>
            </div>
        </motion.div>
        </header>

      
        <section id="features" className="max-w-4xl mx-auto py-20 px-4">
          <motion.h2
          initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            What can you do with e-Bot?
          </motion.h2>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
            className="space-y-6 text-gray-200"
          >
            {features.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="flex items-center gap-3 bg-gray-900/60 rounded-xl px-5 py-4 shadow border border-gray-800"
              >
                {item.icon}
                <div>
                  <div className="font-semibold text-lg mb-1">{item.label}</div>
                  <div className="text-gray-400 text-sm">{item.desc}</div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <div className="flex justify-center mt-8">
            <Button
              asChild
              className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition shadow-lg text-lg"
            >
              Get started
            </Button>
          </div>
      </section>

        {/* Examples Section */}
        <section id="examples" className="max-w-6xl mx-auto py-20 px-4 grid md:grid-cols-4 gap-10">
          {[
            {
              icon: (
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36" className="text-violet-600">
                  <rect x="6" y="6" width="24" height="24" rx="6" fill="currentColor" opacity="0.15"/>
                  <path d="M12 24L24 12M12 12L24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              title: "Génération de Chatbots",
              desc: "Créez et déployez des chatbots personnalisés pour automatiser vos interactions clients avec e-Bot."
            },
            {
              icon: (
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36" className="text-blue-500">
                  <circle cx="18" cy="18" r="12" fill="currentColor" opacity="0.15"/>
                  <path d="M12 18h12M18 12v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              title: "Intégration Multicanal",
              desc: "Connectez e-Bot à vos plateformes préférées : site web, WhatsApp, Messenger, Slack, et plus."
            },
            {
              icon: (
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36" className="text-cyan-500">
                  <ellipse cx="18" cy="22" rx="10" ry="6" fill="currentColor" opacity="0.15"/>
                  <path d="M12 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 24c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                </svg>
              ),
              title: "Analyse & Reporting",
              desc: "Suivez les performances de vos bots avec des tableaux de bord et des rapports détaillés."
            },
            {
              icon: (
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36" className="text-amber-500">
                  <rect x="8" y="14" width="20" height="10" rx="5" fill="currentColor" opacity="0.15"/>
                  <path d="M18 14v-4M14 24h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              title: "Automatisation des Tâches",
              desc: "Automatisez les réponses, la collecte de données et les processus métier grâce à e-Bot."
            },
          ].map((ex, i) => (
        <motion.div
              key={ex.title}
          whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
          className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-10 flex flex-col items-center border border-gray-100 transition-all"
        >
              <span className="mb-4">{ex.icon}</span>
              <h2 className="font-bold text-xl mb-2 text-gray-900">{ex.title}</h2>
              <p className="text-gray-500 text-center">{ex.desc}</p>
        </motion.div>
          ))}
        </section>

        {/* Who is v0 for? */}
        <section id="who" className="max-w-4xl mx-auto py-20 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Who is v0 for?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-semibold text-xl mb-2">Product Managers</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Quickly prototype and iterate to align stakeholders, validate ideas early, and gather user feedback before using engineering resources.</li>
                <li>Draft project plans and timelines</li>
                <li>Generate user interview questions for researching new features</li>
                <li>Create feedback forms where submissions are sent to a database</li>
                <li>Create templates for new features or RFCs</li>
              </ul>
              <h3 className="font-semibold text-xl mb-2">Designers</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Turn mockups into real, high-fidelity user interfaces that reflect user flows and constraints.</li>
                <li>Generate code from screenshots or Figma</li>
                <li>Generate CSS and HTML for prototypes and landing pages</li>
                <li>Add accessibility improvements for basic design elements</li>
                <li>Create interactive components to handoff to developers</li>
              </ul>
              <h3 className="font-semibold text-xl mb-2">Engineers</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Quickly scaffold full-stack apps or components following best practices and modern standards.</li>
                <li>Create React components</li>
                <li>Create custom hooks and functionality</li>
                <li>Migrate to the latest Next.js features</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Data Scientists</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Work with Python and SQL to analyze data and create visualizations.</li>
                <li>Learn SQL</li>
                <li>Write complex queries</li>
                <li>Generate code for data visualization and analysis</li>
                <li>Create dashboards for visualizations</li>
              </ul>
              <h3 className="font-semibold text-xl mb-2">Marketing Teams</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Reduce time-to-market for promotional initiatives by launching custom marketing pages.</li>
                <li>Generate ideas for blog posts, social media content, and ad copy</li>
                <li>Research keywords and optimize your SEO</li>
                <li>Draft email campaigns and newsletters</li>
                <li>Collaborate with developers on features like A/B testing</li>
              </ul>
              <h3 className="font-semibold text-xl mb-2">Content Creators and Educators</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Create interactive examples and games that are easy to follow and understand.</li>
                <li>Help create lesson plans and educational content</li>
                <li>Generate practice exercises and quizzes</li>
                <li>Assist in developing online course materials with progress tracking</li>
                <li>Provide visual explanations for complex concepts, especially related to engineering</li>
              </ul>
              <h3 className="font-semibold text-xl mb-2">Customer Support</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Help customers with technical issues, and build customer support tools.</li>
                <li>Create a chatbot for customer support</li>
                <li>Assist in creating a searchable knowledge base and articles</li>
                <li>Design a customer feedback form</li>
              </ul>
              <h3 className="font-semibold text-xl mb-2">Founders</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                <li>Ship MVPs fast without hiring a dev team, and focus your time on refining product and market fit.</li>
              </ul>
            </div>
          </div>
      </section>

        {/* What makes v0 different? */}
        <section id="difference" className="max-w-4xl mx-auto py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-8 text-center"
        >
            What makes v0 different?
        </motion.h2>
          <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
            className="space-y-6 text-gray-700 list-disc list-inside"
          >
            {[
              "End-to-end: Build both UI and backend logic, not just mockups.",
              "Works with your stack: Use modern tools like Next.js, Tailwind, Data, and more.",
              "Team-friendly: Bridges design, product, and engineering workflows.",
              "Extensible: Use your APIs, databases, and components."
            ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
                {item}
            </motion.li>
          ))}
          </motion.ul>
      </section>

      {/* Call to Action Section */}
        <section id="get-started" className="flex flex-col items-center py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-semibold mb-4"
        >
            Ready to experience the power of v0?
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
            <Button
              asChild
            className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition shadow-lg text-lg"
          >
              Get started for free
            </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm border-t">
          &copy; {new Date().getFullYear()} v0. All rights reserved.
      </footer>
    </main>
    </>
  );
}
