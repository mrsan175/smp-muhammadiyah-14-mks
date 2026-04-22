"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Star, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function PrestasiPage() {
  const achievements = [
    { year: "2024", title: "Juara 1 Olimpiade Matematika", tier: "Provinsi", desc: "Berhasil menyisihkan 120 peserta dari berbagai kabupaten/kota se-Sulawesi Selatan." },
    { year: "2024", title: "Medali Emas Lomba Robotik", tier: "Nasional", desc: "Tim Robotik sekolah berhasil memenangkan kategori Line Follower tingkat nasional." },
    { year: "2023", title: "Juara 1 Futsal Antar-SMP", tier: "Kota", desc: "Menjuarai turnamen futsal Walikota Cup mengalahkan 32 tim lainnya." },
    { year: "2023", title: "Sekolah Adiwiyata Tingkat Kota", tier: "Penghargaan", desc: "Diapresiasi atas komitmen terhadap lingkungan yang asri dan hijau." },
    { year: "2022", title: "Juara 2 Lomba Tahfidz Al-Qur'an", tier: "Nasional", desc: "Ananda Ahmad Fauzan mewakili Sulawesi Selatan di ajang perlombaan Tahfidz 3 Juz." },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader
        badge="Prestasi Siswa"
        title={<>Prestasi <span className="text-primary">Gemilang</span></>}
        description="Deretan pencapaian luar biasa siswa-siswi SMP Muhammadiyah 14 Makassar dalam berbagai bidang akademik dan non-akademik."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="bg-card rounded-3xl p-6 border shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300 hover:border-primary/30"
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{item.year}</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{item.tier}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>


      </div>
    </main>
  );
}
