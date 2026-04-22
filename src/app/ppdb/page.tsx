"use client";

import { motion } from "framer-motion";
import { UserPlus, CalendarCheck, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import Link from "next/link";

export default function PPDBPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader
        badge="Penerimaan Siswa Baru"
        title={<>PPDB <span className="text-primary">2025/2026</span></>}
        description="Mari bergabung bersama kami dalam mewujudkan generasi Islam yang cerdas, berakhlak mulia, dan berprestasi global."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="#"
                className="inline-flex justify-center items-center gap-2 px-8 py-3 w-full sm:w-auto rounded-xl font-bold text-sm text-white transition-all shadow-lg"
                style={{
                  background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                  boxShadow: "0 12px 32px oklch(0.50 0.17 162 / 0.40)",
                  border: "1px solid oklch(1 0 0 / 0.15)",
                }}
              >
                Daftar Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="#"
                className="inline-flex justify-center items-center gap-2 px-8 py-3 w-full sm:w-auto rounded-xl font-bold text-sm text-foreground transition-all bg-card border-2 hover:bg-muted"
              >
                Unduh Brosur
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-3xl p-8 border shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-colors"
          >
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <UserPlus className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Pendaftaran Online</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Isi formulir secara online melalui website atau datang langsung ke sekretariat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-3xl p-8 border shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-colors"
          >
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
              <FileText className="h-7 w-7 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Seleksi & Tes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mengikuti tes peminatan (akademik) dan wawancara serta tes baca/tulis Al-Qur'an.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-3xl p-8 border shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-colors"
          >
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Pengumuman</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hasil diumumkan melalui kontak yang terdaftar dan registrasi ulang bagi yang lulus.
            </p>
          </motion.div>
        </div>

      </div>
    </main>
  );
}
