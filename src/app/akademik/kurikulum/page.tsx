"use client";

import { motion } from "framer-motion";
import { BookOpen, Layers, Zap, Target } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function KurikulumPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Akademik"
        title={<>Kurikulum <span className="text-primary">Sekolah</span></>}
        description="Struktur program pembelajaran yang digunakan di SMP Muhammadiyah 14 Makassar sesuai standar nasional dan kearifan religius."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-8 border shadow-sm relative overflow-hidden"
          >
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Kurikulum Merdeka</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Menerapkan Kurikulum Merdeka yang berpusat pada minat dan bakat peserta didik. Pembelajaran dirancang interaktif melalui Project-Based Learning (PjBL) untuk Profil Pelajar Pancasila.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Pembelajaran Terdiferensiasi</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Proyek Penguatan Profil Pelajar</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Fleksibilitas Waktu & Materi</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-3xl p-8 border shadow-sm relative overflow-hidden"
          >
            <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
              <Layers className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Muatan Ke-Islaman</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Terintegrasi dengan ciri khas Muhammadiyah melalui muatan lokal keagamaan yang dirancang secara khusus guna menanamkan nilai-nilai Al-Islam dan Kemuhammadiyahan.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Tahfidz Al-Qur'an (Target 3 Juz)</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Praktik Ibadah & Bahasa Arab</li>
              <li className="flex items-center gap-2 text-sm font-medium"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Kemuhammadiyahan & Kepanduan</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
