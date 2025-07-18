"use client";
import { Sidebar } from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/button";
import { BarChart2, BookOpen, CalendarDays, CreditCard, MessageCircle } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-100/10 to-background text-foreground flex font-sans">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between px-4 md:px-10 py-6 border-b border-border bg-card/70 backdrop-blur sticky top-0 z-30"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Dashboard étudiant</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <span className="sr-only">Notifications</span>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-gray-500"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
            </Button>
            <Image src="/images/avatar1.png" alt="avatar" width={36} height={36} className="rounded-full border-2 border-primary" />
          </div>
        </motion.header>
        {/* Main content */}
        <main className="flex-1 p-4 md:p-10 bg-transparent">
          {/* Stat cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(80,80,180,0.15)" }}
                className="flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-border py-8 px-4 transition-all cursor-pointer hover:shadow-2xl hover:bg-white/20"
              >
                <div className={`mb-3 p-4 rounded-full bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="size-7" />
                </div>
                <div className="text-2xl font-extrabold mb-1 drop-shadow-sm">{stat.value}</div>
                <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          {/* Progress chart (mock) + Recent activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-border p-6 flex flex-col"
            >
              <div className="font-semibold text-lg mb-4">Progression des cours</div>
              {/* Mock bar chart */}
              <div className="flex items-end gap-4 h-40 w-full">
                {[60, 40, 50, 80, 70, 90, 65].map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.07 }}
                    className="flex flex-col items-center flex-1"
                    style={{ transformOrigin: "bottom" }}
                  >
                    <div className="w-7 rounded-t-xl bg-violet-600 shadow-md" style={{ height: `${v}%` }} />
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
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-border p-6 flex flex-col"
            >
              <div className="font-semibold text-lg mb-4">Activités récentes</div>
              <ul className="flex flex-col gap-4">
                {recentActivities.map((act, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 group hover:bg-white/20 rounded-lg px-2 py-2 transition"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground group-hover:bg-violet-100 group-hover:text-violet-700 transition">
                      {act.type === "Cours" && <BookOpen className="size-5" />}
                      {act.type === "Paiement" && <CreditCard className="size-5" />}
                      {act.type === "Message" && <MessageCircle className="size-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-base">{act.title}</div>
                      <div className="text-xs text-muted-foreground">{act.date}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground border border-border group-hover:bg-violet-100 group-hover:text-violet-700 transition">{act.status}</span>
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
