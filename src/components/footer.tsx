"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from "lucide-react";

// ─── Brand SVG Icons ─────────────────────────────────────────────────────────

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  "Tentang Sekolah": [
    { label: "Profil Sekolah", href: "/profil" },
    { label: "Visi & Misi", href: "/profil/visi-misi" },
    { label: "Sejarah", href: "/profil/sejarah" },
    { label: "Struktur Organisasi", href: "/profil/struktur" },
    { label: "Guru & Staf", href: "/profil/guru-staf" },
  ],
  Program: [
    { label: "Kurikulum", href: "/akademik/kurikulum" },
    { label: "Ekstrakulikuler", href: "/ekskul" },
    { label: "Prestasi", href: "/prestasi" },
    { label: "Galeri", href: "/galeri" },
  ],
  Informasi: [
    { label: "Kegiatan", href: "/kegiatan" },
    { label: "Pengumuman", href: "/pengumuman" },
    { label: "PPDB", href: "/ppdb" },
    { label: "Kontak", href: "/kontak" },
  ],
};

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, label: "Facebook", href: "https://facebook.com", hoverColor: "#1877F2" },
  { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com", hoverColor: "#E1306C" },
  { Icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com", hoverColor: "#FF0000" },
];

const CONTACT_INFO = [
  { icon: MapPin, label: "Jl.Daeng Siraju No.58, Kec. Makasar, Kota Makassar, Prov. Sulawesi Selatan" },
  { icon: Phone, label: "(0411) 409-6934" },
  { icon: Mail, label: "smpmuhammadiyah14@yahoo.com" },
  { icon: Clock, label: "Senin – Jumat: 07.00 – 15.00 WITA" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Footer Component ─────────────────────────────────────────────────────────

export function Footer() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return null;
  }

  return (
    <footer
      style={{
        background: "linear-gradient(160deg, oklch(0.11 0.04 240) 0%, oklch(0.14 0.06 200) 50%, oklch(0.12 0.05 162) 100%)",
      }}
      className="relative overflow-hidden text-white"
    >
      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ background: "oklch(0.50 0.17 162)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-15"
          style={{ background: "oklch(0.82 0.13 85)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* ── Brand Column ── */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform duration-200 group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                  boxShadow: "0 8px 24px oklch(0.50 0.17 162 / 0.35)",
                }}
              >
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-base font-bold text-white">SMP Muhammadiyah 14 Makassar</p>
                <p className="text-xs text-white/50">Sekolah Menengah Pertama Muhammadiyah</p>
              </div>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-[280px]">
              Mencetak generasi berakhlak mulia, berprestasi, dan berjiwa Islami
              yang siap menghadapi tantangan zaman.
            </p>

            {/* Contact Info */}
            <ul className="space-y-3 mb-7">
              {CONTACT_INFO.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5 text-xs text-white/55">
                  <Icon
                    className="h-3.5 w-3.5 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.70 0.14 162)" }}
                  />
                  <span className="leading-relaxed">{label}</span>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, label, href, hoverColor }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-sm transition-all duration-200"
                  style={{
                    background: "oklch(1 0 0 / 0.08)",
                    border: "1px solid oklch(1 0 0 / 0.12)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${hoverColor}22`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${hoverColor}55`;
                    (e.currentTarget.querySelector("svg") as SVGElement | null)!.style.color = hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(1 0 0 / 0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.12)";
                    (e.currentTarget.querySelector("svg") as SVGElement | null)!.style.color = "";
                  }}
                >
                  <Icon className="h-4.5 w-4.5 text-white/50 transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Link Columns ── */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <motion.div key={title} variants={itemVariants}>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "oklch(0.70 0.14 162)" }}
              >
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1 text-sm text-white/55 transition-all duration-150 hover:text-white"
                    >
                      {label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <div
          className="my-10 h-px"
          style={{ background: "oklch(1 0 0 / 0.09)" }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center text-xs text-white/35"
        >
          <p>
            &copy; {new Date().getFullYear()} . Seluruh hak cipta dilindungi.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
