"use client";

import { motion } from "framer-motion";
import React from "react";

interface PageHeaderProps {
    badge?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
    return (
        <section
            className="relative py-20 overflow-hidden"
            style={{
                background:
                    "linear-gradient(160deg, oklch(0.11 0.04 240) 0%, oklch(0.15 0.07 200) 50%, oklch(0.12 0.06 162) 100%)",
            }}
        >
            {/* Visual Blobs & Decorations (Unified design language) */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full blur-[140px] opacity-25"
                    style={{ background: "oklch(0.50 0.17 162)" }}
                />
                <motion.div
                    animate={{ scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full blur-[120px] opacity-20"
                    style={{ background: "oklch(0.82 0.13 85)" }}
                />

                <svg
                    className="absolute top-0 right-0 opacity-10"
                    width="400"
                    height="400"
                    viewBox="0 0 400 400"
                    fill="none"
                >
                    {[60, 100, 140, 175].map((r) => (
                        <circle key={r} cx="200" cy="200" r={r} stroke="white" strokeWidth="1" />
                    ))}
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {badge && (
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5 text-white/80"
                            style={{
                                background: "oklch(0.50 0.17 162 / 0.20)",
                                border: "1px solid oklch(0.50 0.17 162 / 0.40)",
                            }}
                        >
                            {badge}
                        </span>
                    )}

                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
