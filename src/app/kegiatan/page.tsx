"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag, Loader2 } from "lucide-react";
import { KATEGORI_COLOR } from "@/lib/kegiatan";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import useSWR from "swr";
import { getKegiatanAction } from "@/actions/kegiatan";

// ─── Format tanggal ────────────────────────────────────────────────────────────

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Kategori filter ──────────────────────────────────────────────────────────

const SEMUA_KATEGORI = [
  "Semua",
  "Akademik",
  "Ekskul",
  "Sosial",
  "Agama",
  "Prestasi",
] as const;

// ─── Card Kegiatan ─────────────────────────────────────────────────────────────

function KegiatanCard({ item, index }: { item: any; index: number }) {
  const warna = KATEGORI_COLOR[item.kategori as keyof typeof KATEGORI_COLOR] || "oklch(0.50 0.17 162)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
    >
      {/* Gambar */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.gambar}
          alt={item.judul}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Kategori badge overlay */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: warna }}
          >
            {item.kategori}
          </span>
        </div>
        {item.featured && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: "oklch(0.82 0.13 85)" }}
          >
            ⭐ Unggulan
          </div>
        )}
      </div>

      {/* Konten */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatTanggal(item.tanggal)}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {item.penulis || "Admin Sekolah"}
          </span>
        </div>

        {/* Judul */}
        <h2 className="font-bold text-foreground text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {item.judul}
        </h2>

        {/* Ringkasan */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {item.ringkasan}
        </p>

        {/* CTA */}
        <Link
          href={`/kegiatan/${item.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
        >
          Baca Selengkapnya
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KegiatanPage() {
  const [query, setQuery] = useState("");
  const [kategori, setKategori] = useState<string>("Semua");
  
  const { data: dbKegiatan, isLoading } = useSWR("kegiatan_public", () => getKegiatanAction());

  const filtered = (dbKegiatan || [])
    .filter((k) =>
      kategori === "Semua" ? true : k.kategori === kategori
    )
    .filter((k) =>
      query.trim() === ""
        ? true
        : k.judul.toLowerCase().includes(query.toLowerCase()) ||
        k.ringkasan.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* ── Header ── */}
      <PageHeader 
        badge="Berita & Kegiatan"
        title={<>Kegiatan <span className="text-primary">Sekolah</span></>}
        description="Ikuti berbagai kegiatan, prestasi, dan momen berkesan dari kehidupan sekolah ."
      />

      {/* ── Filter & Search ── */}
      <section className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-24 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari kegiatan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          {/* Kategori filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground shrink-0" />
            {SEMUA_KATEGORI.map((k) => (
              <button
                key={k}
                onClick={() => setKategori(k)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background:
                    kategori === k
                      ? "oklch(0.50 0.17 162)"
                      : "oklch(0.50 0.17 162 / 0.10)",
                  color: kategori === k ? "white" : "oklch(0.50 0.17 162)",
                  border: "1px solid oklch(0.50 0.17 162 / 0.30)",
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid Kegiatan ── */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
               <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
               <p>Memuat artikel kegiatan...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Tidak ada kegiatan yang sesuai pencarian.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-8">
                Menampilkan <strong>{filtered.length}</strong> kegiatan
                {kategori !== "Semua" && (
                  <> dalam kategori <strong>{kategori}</strong></>
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, i) => (
                  <KegiatanCard key={item.slug} item={item} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
