"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function JadwalPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Akademik"
        title={<>Jadwal <span className="text-primary">Akademik</span></>}
        description="Kalender kegiatan dan pengumuman jadwal belajar mengajar untuk semester berjalan."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl p-6 md:p-8 border shadow-sm relative overflow-x-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Jadwal Kelas VII-A</h2>
              <p className="text-sm text-muted-foreground">Semester Ganjil 2025/2026</p>
            </div>
          </div>

          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground border-b rounded-t-xl">
              <tr>
                <th className="px-4 py-3 font-semibold rounded-tl-xl"><Clock className="inline h-4 w-4 mr-2" /> Waktu</th>
                <th className="px-4 py-3 font-semibold">Senin</th>
                <th className="px-4 py-3 font-semibold">Selasa</th>
                <th className="px-4 py-3 font-semibold">Rabu</th>
                <th className="px-4 py-3 font-semibold">Kamis</th>
                <th className="px-4 py-3 font-semibold rounded-tr-xl">Jumat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4 font-medium text-foreground">07:15 - 08:35</td>
                <td className="px-4 py-4">Upacara Bendera</td>
                <td className="px-4 py-4">Matematika</td>
                <td className="px-4 py-4">B. Inggris</td>
                <td className="px-4 py-4">IPA Terpadu</td>
                <td className="px-4 py-4">Muhadharah</td>
              </tr>
              <tr className="border-b hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4 font-medium text-foreground">08:35 - 09:55</td>
                <td className="px-4 py-4">IPA Terpadu</td>
                <td className="px-4 py-4">B. Indonesia</td>
                <td className="px-4 py-4">IPS Terpadu</td>
                <td className="px-4 py-4">Matematika</td>
                <td className="px-4 py-4">B. Arab</td>
              </tr>
              <tr className="bg-primary/5 border-b">
                <td colSpan={6} className="px-4 py-3 text-center font-bold text-primary tracking-widest text-xs">
                  ISTIRAHAT PERTAMA
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4 font-medium text-foreground">10:25 - 11:45</td>
                <td className="px-4 py-4">B. Indonesia</td>
                <td className="px-4 py-4">Seni Budaya</td>
                <td className="px-4 py-4">Pend. Agama</td>
                <td className="px-4 py-4">B. Indonesia</td>
                <td className="px-4 py-4">Pend. Agama</td>
              </tr>
              <tr className="bg-primary/5 border-b">
                <td colSpan={6} className="px-4 py-3 text-center font-bold text-primary tracking-widest text-xs">
                  SHOLAT DZUHUR & ISTIRAHAT KEDUA
                </td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4 font-medium text-foreground rounded-bl-xl">12:30 - 13:50</td>
                <td className="px-4 py-4">B. Inggris</td>
                <td className="px-4 py-4">PJOK</td>
                <td className="px-4 py-4">Matematika</td>
                <td className="px-4 py-4">Kemuhammadiyahan</td>
                <td className="px-4 py-4 text-muted-foreground italic rounded-br-xl">Ekskul</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
}
