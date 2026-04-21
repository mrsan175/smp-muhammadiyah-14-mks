"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag, ArrowRight, Loader2 } from "lucide-react";
import { KATEGORI_COLOR } from "@/lib/kegiatan";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { getKegiatanBySlugAction, getRelatedKegiatanAction } from "@/actions/kegiatan";

function formatTanggal(date: Date | string) {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Related card ─────────────────────────────────────────────────────────────

function RelatedCard({ item }: { item: any }) {
  const warna = KATEGORI_COLOR[item.kategori as keyof typeof KATEGORI_COLOR] || "#888";
  return (
    <Link
      href={`/kegiatan/${item.slug}`}
      className="group flex gap-4 rounded-xl p-3 hover:bg-muted transition-colors duration-200"
    >
      <div className="relative h-16 w-20 rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.gambar}
          alt={item.judul}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="80px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: warna }}>
          {item.kategori}
        </span>
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug mt-0.5 group-hover:text-primary transition-colors">
          {item.judul}
        </p>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DetailKegiatanPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: kegiatan, isLoading } = useSWR(
    slug ? `kegiatan_detail_${slug}` : null,
    () => getKegiatanBySlugAction(slug)
  );

  const { data: related = [] } = useSWR(
    slug ? `kegiatan_related_${slug}` : null,
    () => getRelatedKegiatanAction(slug, 3)
  );

  // Show skeleton while loading
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background pt-24">
        <Skeleton className="w-full h-[50vh] min-h-[320px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Data fetched but article not found → 404
  if (kegiatan === null) {
    notFound();
  }

  // Guard while still undefined (edge case)
  if (!kegiatan) return null;

  const warna = KATEGORI_COLOR[kegiatan.kategori as keyof typeof KATEGORI_COLOR] || "#888";

  const paragraphs = kegiatan.konten
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* ── Hero Image ── */}
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <Image
          src={kegiatan.gambar}
          alt={kegiatan.judul}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Button asChild variant="ghost" size="sm" className="bg-black/30 text-white rounded-full gap-1.5 hover:bg-black/20 hover:text-white">
            <Link href="/kegiatan">
              <ArrowLeft className="h-4 w-4" />
              Semua Kegiatan
            </Link>
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute bottom-6 left-4 sm:left-8 z-10 flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white shadow"
            style={{ background: warna }}
          >
            {kegiatan.kategori}
          </span>
          {kegiatan.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow" style={{ background: "oklch(0.82 0.13 85)" }}>
              ⭐ Unggulan
            </span>
          )}
        </div>
      </section>

      {/* ── Konten ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Artikel */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground leading-tight mb-6">
              {kegiatan.judul}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatTanggal(kegiatan.tanggal)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                Admin Sekolah
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                <span style={{ color: warna }} className="font-semibold">
                  {kegiatan.kategori}
                </span>
              </span>
            </div>

            {/* Ringkasan */}
            <p className="text-lg text-muted-foreground leading-relaxed italic mb-8 border-l-4 pl-4" style={{ borderColor: warna }}>
              {kegiatan.ringkasan}
            </p>

            {/* Isi artikel */}
            <div className="prose prose-neutral max-w-none space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed text-base">
                  {p}
                </p>
              ))}
            </div>

            {/* Navigasi bawah */}
            <div className="mt-12 pt-8 border-t border-border">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/kegiatan">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Daftar Kegiatan
                </Link>
              </Button>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            {/* Kegiatan Lainnya */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Kegiatan Lainnya
              </h3>
              {related.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Belum ada artikel lain.</p>
              ) : (
                <div className="space-y-1">
                  {related.map((item: any) => (
                    <RelatedCard key={item.slug} item={item} />
                  ))}
                </div>
              )}
              <Button asChild variant="ghost" size="sm" className="w-full mt-4 gap-1.5 text-primary">
                <Link href="/kegiatan">
                  Lihat Semua Kegiatan
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {/* PPDB CTA */}
            <div
              className="rounded-2xl p-5 text-white text-center"
              style={{ background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))" }}
            >
              <p className="font-bold text-base mb-1">Daftarkan Putra-Putri Anda</p>
              <p className="text-white/75 text-sm mb-4">PPDB 2026/2027 masih dibuka</p>
              <Button asChild size="sm" className="bg-white text-primary hover:bg-white/90 font-bold w-full">
                <Link href="/ppdb">Info PPDB →</Link>
              </Button>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
