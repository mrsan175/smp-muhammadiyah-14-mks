"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useSWR from "swr";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getKelasListAction, getJadwalByKelasAction, type JadwalWithRelations } from "@/actions/jadwal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"] as const;

const HARI_ACCENT: Record<string, { bar: string; header: string; badge: string }> = {
  Senin: { bar: "bg-blue-500", header: "text-blue-600 dark:text-blue-400", badge: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-300" },
  Selasa: { bar: "bg-violet-500", header: "text-violet-600 dark:text-violet-400", badge: "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-950/50 dark:border-violet-800 dark:text-violet-300" },
  Rabu: { bar: "bg-emerald-500", header: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300" },
  Kamis: { bar: "bg-amber-500", header: "text-amber-600 dark:text-amber-400", badge: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-300" },
  Jumat: { bar: "bg-rose-500", header: "text-rose-600 dark:text-rose-400", badge: "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/50 dark:border-rose-800 dark:text-rose-300" },
};

export default function JadwalPage() {
  const { data: kelasList = [], isLoading: loadingKelas } = useSWR("jadwal_kelas_list", getKelasListAction);
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);

  const activeKelas = selectedKelas ?? kelasList[0] ?? null;

  const { data: jadwalRows = [], isLoading: loadingJadwal } = useSWR(
    activeKelas ? `jadwal_${activeKelas}` : null,
    () => getJadwalByKelasAction(activeKelas!),
  );

  const grouped = HARI.reduce((acc, hari) => {
    acc[hari] = (jadwalRows as JadwalWithRelations[])
      .filter((j) => j.hari === hari)
      .sort((a, b) => a.urutan - b.urutan);
    return acc;
  }, {} as Record<string, JadwalWithRelations[]>);

  const hasData = jadwalRows.length > 0;

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader
        badge="Akademik"
        title={<>Jadwal <span className="text-primary">Pelajaran</span></>}
        description="Jadwal kegiatan belajar mengajar per kelas untuk semester berjalan."
      />

      <div className="mx-auto max-w-2xl px-4 sm:px-6 mt-8">

        {/* Kelas Selector */}
        {loadingKelas ? (
          <div className="h-10 w-full rounded-xl bg-muted animate-pulse mb-6" />
        ) : kelasList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-12 border text-center shadow-sm"
          >
            <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-lg font-bold mb-2">Belum Ada Jadwal</h2>
            <p className="text-muted-foreground text-sm">
              Jadwal pelajaran sedang disiapkan. Cek kembali nanti.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Dropdown selector */}
            <div className="mb-6">
              <Select value={activeKelas ?? ""} onValueChange={(v) => setSelectedKelas(v)}>
                <SelectTrigger className="w-full h-11 text-sm font-semibold bg-card shadow-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary shrink-0" />
                    <SelectValue placeholder="Pilih Kelas" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {kelasList.map((k) => (
                    <SelectItem key={k} value={k} className="font-medium">
                      Kelas {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Loading skeleton */}
            {loadingJadwal ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl border overflow-hidden animate-pulse">
                    <div className="h-10 bg-muted" />
                    <div className="p-3 space-y-2">
                      {[1, 2, 3].map((j) => <div key={j} className="h-10 bg-muted/60 rounded-xl" />)}
                    </div>
                  </div>
                ))}
              </div>
            ) : !hasData ? (
              <div className="bg-card rounded-2xl border p-10 text-center text-muted-foreground text-sm">
                Belum ada jadwal untuk kelas <strong>{activeKelas}</strong>.
              </div>
            ) : (
              <div className="space-y-3">
                {HARI.map((hari) => {
                  const slots = grouped[hari];
                  if (!slots || slots.length === 0) return null;
                  const accent = HARI_ACCENT[hari];
                  const mapelCount = slots.filter((s) => !s.isIstirahat).length;

                  return (
                    <motion.div
                      key={hari}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden"
                    >
                      {/* Day header */}
                      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border/60">
                        <span className={`w-2 h-2 rounded-full ${accent.bar} shrink-0`} />
                        <span className={`font-bold text-sm ${accent.header}`}>{hari}</span>
                        <span className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${accent.badge}`}>
                          {mapelCount} Mata Pelajaran
                        </span>
                      </div>

                      {/* Column headers — desktop only */}
                      <div className="hidden sm:grid sm:grid-cols-3 px-4 py-1.5 border-b border-border/40 bg-muted/30">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Waktu</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 text-center">Mata Pelajaran</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 text-right">Guru</span>
                      </div>

                      {/* Rows */}
                      <div className="divide-y divide-border/40">
                        {slots.map((slot) =>
                          slot.isIstirahat ? (
                            // ─── Agenda Khusus ───────────────────────────────
                            <div key={slot.id} className="bg-primary/5 dark:bg-primary/10 italic">
                              {/* Mobile */}
                              <div className="flex items-center gap-3 px-4 py-2.5 sm:hidden">
                                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 shrink-0">
                                  <Clock className="h-3 w-3 opacity-50 shrink-0" />
                                  {slot.jamMulai}–{slot.jamSelesai}
                                </span>
                                <span className="ml-auto text-[11px] font-bold uppercase tracking-widest text-primary dark:text-primary/90 text-right">
                                  {slot.labelIstirahat || "AGENDA KHUSUS"}
                                </span>
                              </div>
                              {/* Desktop */}
                              <div className="hidden sm:grid sm:grid-cols-3 items-center px-4 py-2.5">
                                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3 opacity-50 shrink-0" />
                                  {slot.jamMulai}–{slot.jamSelesai}
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-primary dark:text-primary/90 text-center">
                                  {slot.labelIstirahat || "AGENDA KHUSUS"}
                                </span>
                                <div />
                              </div>
                            </div>
                          ) : (
                            // ─── Baris Pelajaran ─────────────────────────────
                            <div
                              key={slot.id}
                              className="px-4 py-3 hover:bg-muted/20 transition-colors"
                            >
                              {/* Mobile layout: jam kiri, konten kanan */}
                              <div className="flex items-start justify-between gap-3 sm:hidden">
                                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 shrink-0 pt-0.5">
                                  <Clock className="h-3 w-3 opacity-50 shrink-0" />
                                  {slot.jamMulai}
                                </span>
                                <div className="text-right min-w-0">
                                  <p className="font-semibold text-sm text-foreground leading-tight">
                                    {slot.mapelNama ?? "—"}
                                  </p>
                                  {slot.guruNama && (
                                    <p className="text-[11px] text-muted-foreground mt-0.5">
                                      {slot.guruNama}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Desktop layout: 3 columns */}
                              <div className="hidden sm:grid sm:grid-cols-3 items-center">
                                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3 opacity-50 shrink-0" />
                                  {slot.jamMulai}–{slot.jamSelesai}
                                </span>
                                <p className="font-semibold text-sm text-foreground text-center">
                                  {slot.mapelNama ?? "—"}
                                </p>
                                <p className="text-[11px] text-muted-foreground text-right leading-tight truncate">
                                  {slot.guruNama ?? ""}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
