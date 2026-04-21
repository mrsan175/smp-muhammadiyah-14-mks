"use client";

import { motion } from "framer-motion";
import { GraduationCap, Wrench, Clock, Mail } from "lucide-react";

export default function MaintenancePage() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center pt-32 p-6 relative overflow-hidden"
            style={{
                background: "linear-gradient(160deg, oklch(0.11 0.04 240) 0%, oklch(0.15 0.07 200) 50%, oklch(0.12 0.06 162) 100%)",
            }}
        >
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[10%] -right-[5%] w-[45%] h-[45%] rounded-full blur-[150px]"
                    style={{ background: "oklch(0.50 0.17 162)" }}
                />
                <motion.div
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.10, 0.18, 0.10] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full blur-[130px]"
                    style={{ background: "oklch(0.82 0.13 85)" }}
                />
            </div>

            <div className="relative z-10 text-center max-w-xl mx-auto">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div
                        className="p-4 rounded-2xl shadow-xl"
                        style={{
                            background: "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                            boxShadow: "0 16px 40px oklch(0.50 0.17 162 / 0.40)",
                        }}
                    >
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                </motion.div>

                {/* Wrench Icon animated */}
                <motion.div
                    animate={{ rotate: [-12, 12, -12] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex justify-center mb-8"
                >
                    <div
                        className="flex h-24 w-24 items-center justify-center rounded-3xl"
                        style={{
                            background: "oklch(1 0 0 / 0.06)",
                            border: "1px solid oklch(1 0 0 / 0.12)",
                        }}
                    >
                        <Wrench className="h-12 w-12 text-white/70" />
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-10"
                >
                    <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
                        Sedang dalam{" "}
                        <span className="text-primary">Pemeliharaan</span>
                    </h1>
                    <p className="text-white/55 leading-relaxed max-w-md mx-auto text-base">
                        Website SMP Muhammadiyah 14 Makassar sedang dalam proses pemeliharaan
                        dan peningkatan layanan. Kami akan segera kembali.
                    </p>
                </motion.div>

                {/* Info cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
                >
                    {[
                        {
                            icon: Clock,
                            label: "Estimasi Selesai",
                            value: "Beberapa jam lagi",
                        },
                        {
                            icon: Mail,
                            label: "Hubungi Kami",
                            value: "smpmuhammadiyah14@yahoo.com",
                        },
                    ].map(({ icon: Icon, label, value }) => (
                        <div
                            key={label}
                            className="flex items-center gap-3 p-4 rounded-2xl text-left"
                            style={{
                                background: "oklch(1 0 0 / 0.05)",
                                border: "1px solid oklch(1 0 0 / 0.10)",
                            }}
                        >
                            <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                style={{ background: "oklch(0.50 0.17 162 / 0.25)" }}
                            >
                                <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-[11px] text-white/40 font-medium uppercase tracking-wider mb-0.5">
                                    {label}
                                </p>
                                <p className="text-sm text-white/80 font-semibold">{value}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-xs text-white/25"
                >
                    &copy; {new Date().getFullYear()} SMP Muhammadiyah 14 Makassar
                </motion.p>
            </div>
        </div>
    );
}
