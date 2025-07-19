"use client";
import { Sidebar } from "@/components/ui/Sidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BarChart2, BookOpen, CalendarDays, CreditCard, MessageCircle, Info } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { label: "Cours suivis", value: 8, icon: BookOpen, color: "from-violet-500 to-violet-700" },
  { label: "Paiements", value: "3/4", icon: CreditCard, color: "from-green-400 to-green-600" },
  { label: "Prochain cours", value: "Lundi 10h", icon: CalendarDays, color: "from-blue-400 to-blue-600" },
  { label: "Progression", value: "65%", icon: BarChart2, color: "from-amber-400 to-amber-600" },
];

const recentActivities = [
  { type: "Cours", title: "Mathématiques - Algèbre", date: "2024-06-10", status: "Terminé" },
  { type: "Paiement", title: "Paiement Juin", date: "2024-06-05", status: "Effectué" },
  { type: "Message", title: "Nouveau message du prof.", date: "2024-06-04", status: "Non lu" },
  { type: "Cours", title: "Physique - Optique", date: "2024-06-03", status: "Terminé" },
];

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Loader animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Prevent scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-100/10 to-background text-foreground flex font-sans relative">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-lg">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin shadow-xl" />
        </div>
      )}
      {/* Sidebar responsive */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-40 bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        <Sidebar />
      </aside>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="flex-1 ml-0 md:ml-64 min-h-screen flex flex-col transition-all duration-300">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between px-4 md:px-10 py-6 border-b border-border bg-card/70 backdrop-blur sticky top-0 z-30 shadow-md"
        >
          <div className="flex items-center gap-3">
            {/* Hamburger menu for mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-violet-100/60 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-violet-700">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-500 to-amber-500 bg-clip-text text-transparent drop-shadow-lg">Dashboard étudiant</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative group">
              <span className="sr-only">Notifications</span>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-gray-500 group-hover:text-amber-500 transition">
                <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
            </Button>
            <Image src="/images/avatar1.png" alt="avatar" width={36} height={36} className="rounded-full border-2 border-primary shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-amber-400/40" />
          </div>
        </motion.header>
        {/* Main content */}
        <main className="flex-1 p-2 xs:p-4 md:p-10 bg-transparent">
          {/* Stat cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.07, boxShadow: "0 8px 32px 0 rgba(80,80,180,0.18)" }}
                className="flex flex-col items-center bg-gradient-to-br from-white/30 to-violet-100/30 dark:from-gray-900/40 dark:to-violet-900/30 backdrop-blur-lg rounded-2xl shadow-xl border border-border py-7 px-3 xs:px-4 transition-all cursor-pointer hover:shadow-2xl hover:bg-white/30 group relative"
              >
                <div className={`mb-3 p-4 rounded-full bg-gradient-to-br ${stat.color} shadow-lg animate-bounce-slow`}> 
                  <stat.icon className="size-7 text-white drop-shadow" />
                </div>
                <div className="text-2xl font-extrabold mb-1 drop-shadow-sm flex items-center gap-1">
                  {stat.value}
                  <span className="relative group">
                    <Info className="size-4 text-muted-foreground ml-1 cursor-pointer opacity-70 hover:opacity-100" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-8 z-50 w-max min-w-[120px] px-3 py-2 rounded-lg bg-gray-900 text-white text-xs shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                      {stat.label}
                    </span>
                  </span>
                </div>
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          {/* Progress chart (mock) + Recent activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Progress chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="col-span-2 bg-gradient-to-br from-white/20 to-violet-100/20 dark:from-gray-900/30 dark:to-violet-900/20 backdrop-blur-lg rounded-2xl shadow-xl border border-border p-4 xs:p-6 flex flex-col"
            >
              <div className="font-semibold text-lg mb-4 flex items-center gap-2">
                Progression des cours
                <span className="text-xs text-muted-foreground">(semaine)</span>
              </div>
              {/* Mock bar chart dynamique */}
              <div className="flex items-end gap-2 xs:gap-4 h-36 xs:h-40 w-full">
                {[60, 40, 50, 80, 70, 90, 65].map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.07 }}
                    className="flex flex-col items-center flex-1 group"
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="w-6 xs:w-7 rounded-t-xl bg-gradient-to-t from-violet-600 to-amber-400 shadow-md group-hover:scale-110 group-hover:shadow-amber-400/40 transition-transform duration-200" style={{ height: `${v}%` }} />
                    <span className="text-xs text-muted-foreground mt-2">{["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i]}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Recent activities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-gradient-to-br from-white/20 to-violet-100/20 dark:from-gray-900/30 dark:to-violet-900/20 backdrop-blur-lg rounded-2xl shadow-xl border border-border p-4 xs:p-6 flex flex-col"
            >
              <div className="font-semibold text-lg mb-4">Activités récentes</div>
              <ul className="flex flex-col gap-3 xs:gap-4">
                {recentActivities.map((act, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 xs:gap-3 group hover:bg-violet-100/30 dark:hover:bg-violet-900/30 rounded-lg px-2 py-2 transition"
                  >
                    <div className="w-9 h-9 xs:w-10 xs:h-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-violet-100 group-hover:text-violet-700 dark:group-hover:bg-violet-900/40 dark:group-hover:text-amber-400 transition">
                      {act.type === "Cours" && <BookOpen className="size-5" />}
                      {act.type === "Paiement" && <CreditCard className="size-5" />}
                      {act.type === "Message" && <MessageCircle className="size-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-base">{act.title}</div>
                      <div className="text-xs text-muted-foreground">{act.date}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground border border-border group-hover:bg-violet-100 group-hover:text-violet-700 dark:group-hover:bg-violet-900/40 dark:group-hover:text-amber-400 transition">{act.status}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
