"use client";
import Link from "next/link";
import { BookOpen, LayoutDashboard, CreditCard, MessageCircle, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/students", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/students/courses", label: "Mes cours", icon: BookOpen },
  { href: "/dashboard/students/payments", label: "Paiements", icon: CreditCard },
  { href: "/dashboard/students/messages", label: "Messages", icon: MessageCircle },
  { href: "/dashboard/students/profile", label: "Profil", icon: User },
  { href: "/dashboard/students/settings", label: "Paramètres", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col py-8 px-4 gap-4 fixed md:static z-40",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-8 px-2">
        <img src="/logo.png" alt="e-Bot Logo" className="h-8 w-auto" />
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-base hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 