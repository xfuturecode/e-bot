"use client";
import { Button } from "@/components/ui/button";
import { User, BarChart2, PlusCircle, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-card shadow-lg rounded-xl p-8 border border-border flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">Bienvenue sur le dashboard Admin</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-xl">
          Gérez les utilisateurs, consultez les statistiques, et administrez la plateforme e-Bot en toute simplicité.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          <Button variant="default" className="flex flex-col items-center py-6 gap-2">
            <User className="mb-1" />
            Utilisateurs
          </Button>
          <Button variant="secondary" className="flex flex-col items-center py-6 gap-2">
            <BarChart2 className="mb-1" />
            Statistiques
          </Button>
          <Button variant="outline" className="flex flex-col items-center py-6 gap-2">
            <PlusCircle className="mb-1" />
            Ajouter un admin
          </Button>
        </div>
        <div className="w-full flex justify-center mt-8">
          <Button variant="ghost" className="flex items-center gap-2">
            <FileText />
            Voir les logs
          </Button>
        </div>
      </div>
    </main>
  );
}
