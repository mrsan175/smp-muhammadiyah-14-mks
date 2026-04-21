"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            setVisible(scrollY > 200);
            setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    // SVG circle progress ring
    const size = 44;
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-to-top"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="fixed bottom-6 right-6 z-50 flex items-center justify-center cursor-pointer"
                    style={{ width: size, height: size }}
                >

                    {/* Progress ring SVG */}
                    {/* <svg
                        width={size}
                        height={size}
                        className="absolute inset-0 -rotate-90"
                        style={{ filter: "drop-shadow(0 0 6px oklch(0.50 0.17 162 / 0.6))" }}
                    >
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="oklch(1 0 0 / 0.15)"
                            strokeWidth={strokeWidth}
                        />
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="url(#grad)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            style={{ transition: "stroke-dashoffset 0.2s ease" }}
                        />
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="oklch(0.65 0.18 162)" />
                                <stop offset="100%" stopColor="oklch(0.82 0.13 85)" />
                            </linearGradient>
                        </defs>
                    </svg> */}

                    {/* Center button face */}
                    <span
                        className="relative flex h-8 w-8 items-center justify-center rounded-full"
                        style={{
                            background:
                                "linear-gradient(135deg, oklch(0.50 0.17 162), oklch(0.62 0.18 175))",
                        }}
                    >
                        <ArrowUp className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
