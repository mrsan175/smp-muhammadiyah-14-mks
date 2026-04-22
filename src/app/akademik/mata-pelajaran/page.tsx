"use client";

import { motion } from "framer-motion";
import { BookMarked, Calculator, FlaskConical, Globe2, Shapes } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function MataPelajaranPage() {
  const subjects = [
    { title: "Pendidikan Agama Islam", icon: BookMarked, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Pendidikan Kewarganegaraan", icon: BookMarked, color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Bahasa Indonesia", icon: BookMarked, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Matematika", icon: Calculator, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Ilmu Pengetahuan Alam", icon: FlaskConical, color: "text-teal-500", bg: "bg-teal-500/10" },
    { title: "Ilmu Pengetahuan Sosial", icon: Globe2, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Bahasa Inggris", icon: BookMarked, color: "text-sky-500", bg: "bg-sky-500/10" },
    { title: "Seni Budaya", icon: Shapes, color: "text-pink-500", bg: "bg-pink-500/10" },
    { title: "Pendidikan Jasmani", icon: BookMarked, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Kemuhammadiyahan", icon: BookMarked, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Akademik"
        title={<>Mata <span className="text-primary">Pelajaran</span></>}
        description="Daftar pelajaran wajib dan muatan lokal yang diajarkan pada seluruh tingkat kelas (VII, VIII, IX)."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              className="bg-card rounded-2xl p-5 border shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
