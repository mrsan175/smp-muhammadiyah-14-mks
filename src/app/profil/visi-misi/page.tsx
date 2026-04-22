"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function VisiMisiPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Profil Sekolah"
        title={<>Visi & <span className="text-primary">Misi</span></>}
        description="Cita-cita dan arah pendidikan SMP Muhammadiyah 14 Makassar dalam membentuk generasi unggul yang berakhlak mulia."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl border shadow-sm p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 h-32 w-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Lightbulb className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Visi Kami</h2>
            <p className="text-xl leading-relaxed font-medium text-foreground/80">
              "Menjadi institusi pendidikan Islam yang unggul dalam Imtaq dan Iptek,
              berwawasan global, dan berakar pada budaya bangsa."
            </p>
          </motion.div>

          {/* Misi */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-3xl border shadow-sm p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute -bottom-12 -left-12 h-32 w-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <Target className="h-7 w-7 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Misi Kami</h2>
            <ul className="space-y-4">
              {[
                "Menyelenggarakan pendidikan yang memadukan kurikulum nasional dan nilai-nilai Al-Islam Kemuhammadiyahan.",
                "Menumbuhkembangkan potensi akademik dan non-akademik siswa secara optimal.",
                "Membangun karakter siswa yang mandiri, kreatif, dan peduli lingkungan.",
                "Meningkatkan profesionalisme tenaga pendidik dan kependidikan.",
              ].map((misi, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80 leading-relaxed font-medium">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{misi}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
