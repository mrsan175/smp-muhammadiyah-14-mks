"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, GraduationCap } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-32 p-6 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute -top-[15%] -right-[10%] w-[45%] h-[45%] rounded-full blur-[140px] opacity-15"
                    style={{ background: "oklch(0.50 0.17 162)" }}
                />
                <div
                    className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10"
                    style={{ background: "oklch(0.82 0.13 85)" }}
                />
            </div>

            <div className="relative z-10 text-center max-w-lg mx-auto">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-10"
                >
                    <div
                        className="p-4 rounded-2xl shadow-xl"
                        style={{
                            background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                        }}
                    >
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                </motion.div>

                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-6"
                >
                    <span
                        className="text-[8rem] sm:text-[11rem] font-black leading-none select-none tabular-nums"
                        style={{ color: "oklch(0.50 0.17 162 / 0.12)" }}
                    >
                        404
                    </span>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="-mt-8 mb-10"
                >
                    <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                        Silakan kembali ke beranda.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex justify-center"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                        style={{
                            background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                            boxShadow: "0 10px 30px oklch(0.50 0.17 162 / 0.30)",
                        }}
                    >
                        <Home className="h-4 w-4" />
                        Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
