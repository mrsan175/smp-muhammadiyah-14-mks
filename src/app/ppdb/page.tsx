"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    FileText,
    UserPlus,
    FileCheck,
    UserCheck,
    Phone,
    ArrowRight,
    MapPin,
    CalendarClock
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

// Komponen animasi muncul
function FadeUp({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function PPDBPage() {
    return (
        <div className="min-h-screen bg-background pt-24">
            {/* ════════════ HEADER / HERO ════════════ */}
            {/* ════════════ HEADER / HERO ════════════ */}
            <PageHeader 
                badge="Tahun Ajaran 2026/2027"
                title={<>Penerimaan Peserta Didik Baru <span className="text-primary">(PPDB)</span></>}
                description="Mari bergabung bersama SMP Muhammadiyah 14 Makassar untuk membentuk generasi unggul, berprestasi, dan berakhlak Islami. Pendaftaran kini telah dibuka!"
            />

            {/* ════════════ INFORMASI & JADWAL ════════════ */}
            <section className="py-28 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Waktu Pelaksanaan */}
                        <FadeUp>
                            <motion.div
                                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                className="p-8 rounded-2xl h-full cursor-default"
                                style={{
                                    border: "1px solid oklch(0 0 0 / 0.07)",
                                    background: "oklch(1 0 0)",
                                }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: "oklch(0.50 0.17 162 / 0.1)", color: "oklch(0.50 0.17 162)" }}
                                    >
                                        <CalendarClock className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">Jadwal PPDB</h2>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { wave: "Gelombang 1", date: "Januari - Maret 2024", desc: "Potongan biaya pendaftaran 50%" },
                                        { wave: "Gelombang 2", date: "April - Mei 2024", desc: "Potongan biaya pendaftaran 25%" },
                                        { wave: "Gelombang 3", date: "Juni - Juli 2024", desc: "Biaya pendaftaran normal" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-card border border-border">
                                            <div>
                                                <p className="font-bold text-foreground">{item.wave}</p>
                                                <p className="text-sm text-primary font-medium">{item.date}</p>
                                            </div>
                                            <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md w-fit">
                                                {item.desc}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </FadeUp>

                        {/* Syarat Pendaftaran */}
                        <FadeUp delay={0.2}>
                            <motion.div
                                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                className="p-8 rounded-2xl h-full cursor-default"
                                style={{
                                    border: "1px solid oklch(0 0 0 / 0.07)",
                                    background: "oklch(1 0 0)",
                                }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: "oklch(0.82 0.13 85 / 0.1)", color: "oklch(0.70 0.13 85)" }}
                                    >
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">Syarat Pendaftaran</h2>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Mengisi formulir pendaftaran",
                                        "Fotokopi rapor SD/MI kelas 4, 5, dan 6 (semester 1)",
                                        "Fotokopi Akta Kelahiran dan Kartu Keluarga (KK)",
                                        "Fotokopi KTP Orang Tua / Wali",
                                        "Pas foto ukuran 3x4 (3 lembar) berlatar merah",
                                        "Sertifikat/Piagam penghargaan (jika ada)"
                                    ].map((syarat, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
                                            <span className="text-foreground/80 leading-relaxed">{syarat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ════════════ ALUR PENDAFTARAN ════════════ */}
            <section
                className="py-28 relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(160deg, oklch(0.11 0.04 240) 0%, oklch(0.15 0.07 200) 50%, oklch(0.12 0.06 162) 100%)",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeUp className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Alur Pendaftaran
                        </h2>
                        <p className="text-white/60">
                            Proses pendaftaran yang mudah, cepat, dan transparan.
                        </p>
                    </FadeUp>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "1",
                                title: "Pendaftaran Online / Offline",
                                desc: "Mengisi form di website ini atau datang langsung ke sekolah.",
                                icon: UserPlus,
                            },
                            {
                                step: "2",
                                title: "Pengumpulan Berkas",
                                desc: "Serahkan berkas fisik ke tata usaha sekolah untuk diverifikasi.",
                                icon: FileCheck,
                            },
                            {
                                step: "3",
                                title: "Tes & Wawancara",
                                desc: "Calon siswa mengikuti tes dasar dan orang tua/wali diwawancarai.",
                                icon: UserCheck,
                            },
                            {
                                step: "4",
                                title: "Daftar Ulang",
                                desc: "Pengumuman kelulusan dan proses daftar ulang administrasi.",
                                icon: CheckCircle2,
                            },
                        ].map((item, idx) => (
                            <FadeUp key={idx} delay={idx * 0.1}>
                                <motion.div
                                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                    className="relative p-8 rounded-2xl h-full overflow-hidden cursor-default"
                                    style={{
                                        background: "oklch(1 0 0 / 0.05)",
                                        border: "1px solid oklch(1 0 0 / 0.10)",
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    <div className="flex gap-2 text-5xl font-black mb-6" style={{ color: "oklch(0.50 0.17 162)" }}>
                                        <div
                                            className="h-12 w-12 rounded-xl flex items-center justify-center"
                                            style={{ background: "oklch(0.50 0.17 162 / 0.15)" }}
                                        >
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <span>
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ CTA HUBUNGI KAMI ════════════ */}
            <section className="py-28 bg-background">
                <FadeUp className="max-w-4xl mx-auto px-4 text-center">
                    <div
                        className="p-10 md:p-14 rounded-[2.5rem] border border-border"
                        style={{
                            background: "linear-gradient(to bottom right, oklch(0 0 0 / 0.02), transparent)",
                        }}
                    >
                        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                            Siap Mendaftar?
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                            Untuk saat ini, formulir pendaftaran online sedang dalam masa persiapan.
                            Silakan hubungi kami via WhatsApp atau datang langsung ke sekolah.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <a
                                    href="https://wa.me/6281234567890" // Ganti dengan nomor asli
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-xl w-full sm:w-auto justify-center"
                                    style={{ background: "oklch(0.50 0.17 162)", boxShadow: "0 10px 30px oklch(0.50 0.17 162 / 0.3)" }}
                                >
                                    <Phone className="h-5 w-5" />
                                    Hubungi WhatsApp
                                </a>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    href="/kontak"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground border border-border hover:bg-muted transition-colors w-full sm:w-auto justify-center"
                                >
                                    <MapPin className="h-5 w-5" />
                                    Lihat Lokasi Sekolah
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </FadeUp>
            </section>
        </div>
    );
}
