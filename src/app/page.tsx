"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useSWR from "swr";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  ArrowRight,
  Heart,
  Globe,
  Lightbulb,
  Shield,
  MapPin,
  Quote,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { KATEGORI_COLOR } from "@/lib/kegiatan";
import { getKegiatanAction } from "@/actions/kegiatan";

// ─── Reusable animation wrappers ─────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "500+", label: "Siswa Aktif", icon: Users, color: "oklch(0.50 0.17 162)" },
  { value: "40+", label: "Tenaga Pengajar", icon: GraduationCap, color: "oklch(0.82 0.13 85)" },
  { value: "30+", label: "Tahun Berdiri", icon: BookOpen, color: "oklch(0.62 0.18 175)" },
  { value: "150+", label: "Prestasi Diraih", icon: Trophy, color: "oklch(0.72 0.15 85)" },
];

const VALUES = [
  {
    icon: Heart,
    title: "Akhlak Mulia",
    desc: "Membentuk karakter Islami yang kuat dan berbudi pekerti luhur dalam setiap aspek kehidupan.",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "oklch(0.50 0.17 162)",
  },
  {
    icon: Lightbulb,
    title: "Inovatif",
    desc: "Mendorong kreativitas dan kemampuan berpikir kritis untuk menghadapi tantangan masa depan.",
    gradient: "from-amber-500/20 to-amber-600/10",
    iconBg: "oklch(0.82 0.13 85)",
  },
  {
    icon: Globe,
    title: "Berwawasan Luas",
    desc: "Mengembangkan wawasan global dengan tetap berlandaskan pada nilai-nilai Islam yang kokoh.",
    gradient: "from-sky-500/20 to-sky-600/10",
    iconBg: "oklch(0.62 0.18 220)",
  },
  {
    icon: Shield,
    title: "Integritas",
    desc: "Menjunjung tinggi kejujuran, tanggung jawab, dan disiplin dalam setiap tindakan.",
    gradient: "from-violet-500/20 to-violet-600/10",
    iconBg: "oklch(0.55 0.20 280)",
  },
];

const ACHIEVEMENTS = [
  { text: "Juara 1 Olimpiade Matematika Tingkat Provinsi 2024", badge: "Provinsi" },
  { text: "Juara 2 Lomba Tahfidz Nasional 2023", badge: "Nasional" },
  { text: "Sekolah Adiwiyata Tingkat Kota 2023", badge: "Kota" },
  { text: "Juara 1 Futsal Antar-SMP se-Makassar 2024", badge: "Kota" },
  { text: "Juara 1 Debat Bahasa Inggris Tingkat Kota 2024", badge: "Kota" },
  { text: "Akreditasi A oleh BAN-S/M", badge: "Nasional" },
];

const PROGRAMS = [
  {
    icon: BookOpen,
    title: "Tahfidz Al-Qur'an",
    desc: "Program hafalan Al-Qur'an yang terintegrasi dalam kurikulum harian dengan bimbingan hafidz berpengalaman.",
    tag: "Program Unggulan",
    color: "oklch(0.50 0.17 162)",
    bg: "oklch(0.50 0.17 162 / 0.08)",
  },
  {
    icon: Zap,
    title: "Sains & Teknologi",
    desc: "Lab modern untuk mendukung pembelajaran STEM yang inovatif dan menyenangkan.",
    tag: "STEM",
    color: "oklch(0.82 0.13 85)",
    bg: "oklch(0.82 0.13 85 / 0.08)",
  },
  {
    icon: Globe,
    title: "Bahasa & Literasi",
    desc: "Kelas bahasa Arab, Inggris, dan Indonesia untuk membangun komunikasi global.",
    tag: "Bahasa",
    color: "oklch(0.62 0.18 220)",
    bg: "oklch(0.62 0.18 220 / 0.08)",
  },
  {
    icon: Trophy,
    title: "Olahraga & Seni",
    desc: "Pengembangan bakat seni, musik, dan olahraga melalui ekstrakulikuler pilihan.",
    tag: "Ekskul",
    color: "oklch(0.55 0.20 280)",
    bg: "oklch(0.55 0.20 280 / 0.08)",
  },
];

// Nilai random di-generate sekali di luar komponen agar stabil (tidak re-render)
const PARTICLES = [
  { width: 6, height: 6, top: "20%", left: "15%", background: "oklch(0.50 0.17 162 / 0.6)", dur: 6, delay: 0 },
  { width: 4, height: 4, top: "60%", left: "80%", background: "oklch(0.82 0.13 85 / 0.5)", dur: 7, delay: 1 },
  { width: 8, height: 8, top: "75%", left: "25%", background: "oklch(0.62 0.18 175 / 0.4)", dur: 5, delay: 2 },
  { width: 5, height: 5, top: "35%", left: "70%", background: "oklch(0.50 0.17 162 / 0.5)", dur: 8, delay: 0.5 },
  { width: 3, height: 3, top: "80%", left: "60%", background: "oklch(0.82 0.13 85 / 0.6)", dur: 6, delay: 1.5 },
  { width: 7, height: 7, top: "15%", left: "55%", background: "oklch(0.62 0.18 175 / 0.4)", dur: 9, delay: 3 },
] as const;

function Particle({ dur, delay, ...style }: typeof PARTICLES[number]) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [0, -16, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  icon: Icon,
  color,
  delay,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col items-center gap-2 p-3 rounded-xl backdrop-blur-sm cursor-default group"
      style={{
        background: "oklch(1 0 0 / 0.06)",
        border: "1px solid oklch(1 0 0 / 0.12)",
      }}
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: `${color}25`, boxShadow: `0 0 14px ${color}35` }}
      >
        <Icon className="h-4 w-4" style={{ color }} />
      </motion.div>
      <span className="text-xl font-black text-white leading-none">{value}</span>
      <span className="text-[11px] text-white/50 text-center leading-tight">{label}</span>
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${color}18` }}
      />
    </motion.div>
  );
}

// ─── Kegiatan Terbaru Grid (SWR) ──────────────────────────────────────────────

function KegiatanTerbaruGrid() {
  const { data: semua, isLoading } = useSWR("kegiatan_home", () => getKegiatanAction());

  const terbaru = (semua ?? []).slice(0, 3);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
            <div className="h-48 bg-muted" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!terbaru.length) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-sm">Belum ada kegiatan yang dipublish.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {terbaru.map((item, i) => {
        const warna = KATEGORI_COLOR[item.kategori as keyof typeof KATEGORI_COLOR] || "#888";
        return (
          <FadeUp key={item.id} delay={i * 0.1}>
            <Link
              href={`/kegiatan/${item.slug}`}
              className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.gambar}
                  alt={item.judul}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: warna }}
                  >
                    {item.kategori}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-2">
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
                <h3 className="font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-2">
                  {item.judul}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.ringkasan}
                </p>
              </div>
            </Link>
          </FadeUp>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ════════════ HERO ════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-start overflow-hidden pt-24"
      >
        {/* ── Background Image ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=60&fm=webp"
            alt="Hero background — suasana sekolah"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={60}
          />
          {/* Dark + color gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.09 0.04 240 / 0.88) 0%, oklch(0.13 0.07 200 / 0.82) 40%, oklch(0.12 0.09 162 / 0.80) 70%, oklch(0.09 0.04 240 / 0.90) 100%)",
            }}
          />
        </div>
        {/* Parallax bg layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Large glow orbs — static, no JS animation for GPU relief */}
          <div
            className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full blur-2xl pointer-events-none"
            style={{ background: "oklch(0.50 0.17 162 / 0.14)" }}
          />
          <div
            className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full blur-2xl pointer-events-none"
            style={{ background: "oklch(0.82 0.13 85 / 0.09)" }}
          />

          {/* Floating particles — values are static consts, no Math.random() */}
          {PARTICLES.map((p, i) => (
            <Particle key={i} {...p} />
          ))}

          {/* Subtle dot pattern — replaces grid lines */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Decorative concentric ring — top right */}
          <svg
            className="absolute -top-24 -right-24 opacity-[0.08]"
            width="480"
            height="480"
            viewBox="0 0 480 480"
            fill="none"
          >
            {[60, 110, 160, 210, 230].map((r) => (
              <circle key={r} cx="240" cy="240" r={r} stroke="white" strokeWidth="1" />
            ))}
          </svg>

          {/* Decorative concentric ring — bottom left */}
          <svg
            className="absolute -bottom-20 -left-20 opacity-[0.06]"
            width="360"
            height="360"
            viewBox="0 0 360 360"
            fill="none"
          >
            {[50, 90, 130, 170].map((r) => (
              <circle key={r} cx="180" cy="180" r={r} stroke="white" strokeWidth="1" />
            ))}
          </svg>

          {/* Diagonal accent line */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center py-8 flex flex-col items-center justify-center flex-1">
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-8"
          >
            <div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background: "oklch(0.50 0.17 162 / 0.15)",
                border: "1px solid oklch(0.50 0.17 162 / 0.40)",
                color: "oklch(0.75 0.13 162)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Sparkles className="h-4 w-4" />
              Website Resmi 
              <Sparkles className="h-4 w-4" />
            </div>
          </motion.div> */}

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            Mencetak Generasi{" "}
            <span className="block mt-1 text-primary">
              Islami &amp; Berprestasi
            </span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Membimbing siswa menjadi pribadi
            berakhlak mulia, cerdas secara akademik, dan siap berkontribusi
            bagi bangsa dan agama.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                  boxShadow: "0 12px 32px oklch(0.50 0.17 162 / 0.40)",
                }}
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white/80 transition-all hover:text-white"
                style={{
                  background: "oklch(1 0 0 / 0.07)",
                  border: "1px solid oklch(1 0 0 / 0.18)",
                  backdropFilter: "blur(12px)",
                }}
              >
                Profil Sekolah
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Strip — compact horizontal bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="w-full rounded-2xl overflow-hidden"
            style={{
              background: "oklch(1 0 0 / 0.06)",
              border: "1px solid oklch(1 0 0 / 0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="grid grid-cols-4 divide-x divide-white/10">
              {STATS.map(({ value, label, icon: Icon, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.08 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="flex flex-col items-center justify-center gap-1.5 py-3 px-2 cursor-default"
                >
                  {/* Icon with colored bg */}
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                    style={{ background: `${color}30` }}
                  >
                    <Icon
                      size={14}
                      color={color}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-sm sm:text-base font-black text-white leading-none">
                      {value}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-white/45 leading-tight text-center">
                      {label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ NILAI ════════════ */}
      <section className="py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-foreground mb-5 leading-tight">
              Berlandaskan{" "}
              <span className="text-primary">Islam &amp; Kemuhammadiyahan</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              Setiap program pendidikan kami dirancang untuk membentuk pribadi
              yang utuh, beriman, dan mampu beradaptasi di era global.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, iconBg }, i) => (
              <ScaleIn key={title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="group h-full relative rounded-2xl p-6 overflow-hidden cursor-default"
                  style={{
                    border: "1px solid oklch(0 0 0 / 0.07)",
                    background: "oklch(1 0 0)",
                  }}
                >
                  {/* Gradient bg on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `${iconBg}0D` }}
                  />

                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${iconBg}, ${iconBg}cc)`,
                      boxShadow: `0 8px 24px ${iconBg}40`,
                    }}
                  >
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                    style={{ background: iconBg }}
                  />
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ PROGRAM UNGGULAN ════════════ */}
      <section
        className="py-28 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.11 0.04 240) 0%, oklch(0.15 0.07 200) 50%, oklch(0.12 0.06 162) 100%)",
        }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 right-0 h-96 w-96 rounded-full blur-3xl opacity-20"
            style={{ background: "oklch(0.50 0.17 162)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-15"
            style={{ background: "oklch(0.82 0.13 85)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 leading-tight">
              Program Unggulan{" "}
              <span className="text-primary">Berkualitas</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto text-base leading-relaxed">
              Berbagai program dirancang untuk mengembangkan potensi siswa secara
              menyeluruh, dari akademik hingga karakter.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMS.map(({ icon: Icon, title, desc, tag, color, bg }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative h-full rounded-2xl p-6 overflow-hidden"
                  style={{
                    background: "oklch(1 0 0 / 0.05)",
                    border: "1px solid oklch(1 0 0 / 0.10)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Hover bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: bg }}
                  />

                  <div className="relative z-10">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl mb-5 shadow-md"
                      style={{ background: color, boxShadow: `0 6px 20px ${color}50` }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                      style={{ background: `${color}20`, color }}
                    >
                      {tag}
                    </span>
                    <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                    <p className="text-xs text-white/55 leading-relaxed">{desc}</p>
                  </div>

                  {/* Bottom glow line */}
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: color }}
                  />
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4} className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/akademik"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                  boxShadow: "0 8px 24px oklch(0.50 0.17 162 / 0.35)",
                }}
              >
                Lihat Semua Program <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </FadeUp>
        </div>
      </section>


      {/* ════════════ KEGIATAN TERBARU ════════════ */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-2 leading-tight">
                Kegiatan{" "}
                <span className="text-primary">Terbaru</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Ikuti berbagai kegiatan dan momen terkini di SMP Muhammadiyah 14 Makassar
              </p>
            </div>
            <Link
              href="/kegiatan"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200 shrink-0"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>

          {/* SWR — data langsung dari database */}
          <KegiatanTerbaruGrid />
        </div>
      </section>

      {/* ════════════ LOKASI ════════════ */}
      <section
        className="py-28 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.11 0.04 240) 0%, oklch(0.15 0.07 200) 50%, oklch(0.12 0.06 162) 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{
                  background: "oklch(0.50 0.17 162 / 0.12)",
                  border: "1px solid oklch(0.50 0.17 162 / 0.30)",
                  color: "oklch(0.50 0.17 162)",
                }}
              >
                <MapPin className="h-3.5 w-3.5" /> Lokasi Kami
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-5">
                Temukan Kami di{" "}
                <span className="text-primary">Makassar</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Jl.Daeng Siraju No.58, Kec. Makasar, Kota Makassar, Prov. Sulawesi Selatan.
                Mudah dijangkau dari berbagai penjuru kota.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Jam Belajar", value: "Senin – Jumat, 07.00 – 15.00 WITA" },
                  { label: "Telepon", value: "(0411) 409-6934" },
                  { label: "Email", value: "smpmuhammadiyah14@yahoo.com" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider w-28 shrink-0"
                      style={{ color: "oklch(0.50 0.17 162)" }}
                    >
                      {label}
                    </span>
                    <span className="text-sm text-white/60">{value}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Map placeholder */}
            <ScaleIn>
              <div
                className="relative rounded-3xl overflow-hidden h-80 bg-muted/50 border border-border"
              >
                <iframe
                  src="https://maps.google.com/maps?q=SMP%20Muhammadiyah%2014%20Makassar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi SMP Muhammadiyah 14 Makassar"
                  className="absolute inset-0 grayscale-20 contrast-[1.1]"
                />
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="py-28 bg-background">
        <FadeUp className="mx-auto max-w-4xl px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.50 0.17 162 / 0.10)",
              border: "1px solid oklch(0.50 0.17 162 / 0.25)",
              color: "oklch(0.50 0.17 162)",
            }}
          >
            Penerimaan Peserta Didik Baru
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-6 leading-tight">
            Bergabunglah Bersama Keluarga Besar
            <span className="mt-1 block text-primary">
              SMP Muhammadiyah 14 Makassar
            </span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Daftarkan putra-putri Anda dan berikan mereka kesempatan untuk tumbuh
            bersama pendidikan berkualitas dalam lingkungan Islami yang kondusif.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                  boxShadow: "0 16px 40px oklch(0.50 0.17 162 / 0.30)",
                }}
              >
                Daftar PPDB Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-foreground hover:text-primary transition-colors"
                style={{
                  background: "oklch(0 0 0 / 0.04)",
                  border: "1px solid oklch(0 0 0 / 0.12)",
                }}
              >
                Hubungi Kami
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
