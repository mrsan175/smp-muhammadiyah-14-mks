"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getMataPelajaranAction } from "@/actions/mata-pelajaran";
import { Skeleton } from "@/components/ui/skeleton";

// Siklus warna untuk kotak inisial
const PALETTES = [
  { text: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-200 dark:border-blue-800" },
  { text: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-200 dark:border-emerald-800" },
  { text: "text-violet-600", bg: "bg-violet-500/10", border: "border-violet-200 dark:border-violet-800" },
  { text: "text-rose-600", bg: "bg-rose-500/10", border: "border-rose-200 dark:border-rose-800" },
  { text: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-200 dark:border-amber-800" },
  { text: "text-teal-600", bg: "bg-teal-500/10", border: "border-teal-200 dark:border-teal-800" },
  { text: "text-indigo-600", bg: "bg-indigo-500/10", border: "border-indigo-200 dark:border-indigo-800" },
  { text: "text-pink-600", bg: "bg-pink-500/10", border: "border-pink-200 dark:border-pink-800" },
  { text: "text-orange-600", bg: "bg-orange-500/10", border: "border-orange-200 dark:border-orange-800" },
  { text: "text-sky-600", bg: "bg-sky-500/10", border: "border-sky-200 dark:border-sky-800" },
  { text: "text-green-600", bg: "bg-green-500/10", border: "border-green-200 dark:border-green-800" },
  { text: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
];

// Ambil inisial dari nama mapel (maks 3 huruf)
function getInitials(nama: string): string {
  const words = nama.trim().split(/\s+/);
  if (words.length === 1) return nama.slice(0, 3).toUpperCase();
  return words.slice(0, 3).map((w) => w[0]).join("").toUpperCase();
}

export default function MataPelajaranPage() {
  const { data: mapelList = [], isLoading } = useSWR("mapel_public", getMataPelajaranAction);

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader
        badge="Akademik"
        title={<>Mata <span className="text-primary">Pelajaran</span></>}
        description="Daftar pelajaran wajib dan muatan lokal yang diajarkan pada seluruh tingkat kelas (VII, VIII, IX)."
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-5 border shadow-sm flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        ) : mapelList.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            <BookOpen className="h-12 w-12 mx-auto opacity-20 mb-4" />
            <p>Daftar mata pelajaran belum tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mapelList.map((item, i) => {
              const palette = PALETTES[i % PALETTES.length];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04 }}
                  className="group bg-card rounded-2xl p-5 border shadow-sm flex items-center gap-4 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  {/* Nomor urut */}
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border ${palette.bg} ${palette.border}`}>
                    <span className={`text-base font-black tabular-nums ${palette.text}`}>
                      {i + 1}
                    </span>
                  </div>

                  {/* Nama */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                      {item.nama}
                    </h3>
                    {item.kode && (
                      <span className="text-[10px] font-semibold text-muted-foreground mt-0.5 block uppercase tracking-widest">
                        {item.kode}
                      </span>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
