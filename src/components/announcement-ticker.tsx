"use client";

import { usePathname } from "next/navigation";
import { Megaphone } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { getPengumumanAction } from "@/actions/pengumuman";

// ─── Ticker ───────────────────────────────────────────────────────────────────

export function AnnouncementTicker() {
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);

  const { data: dbPengumuman } = useSWR("pengumuman_public", () => getPengumumanAction());

  const activePengumuman = (dbPengumuman || []).filter(p => p.isActive);

  // Sembunyikan di halaman dashboard/login/register, atau jika tak ada pengumuman
  const hidden =
    activePengumuman.length === 0 ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  if (hidden) return null;

  // Duplikasi 4x agar infinite loop tidak pernah terlihat kosong
  const items = [
    ...activePengumuman,
    ...activePengumuman,
    ...activePengumuman,
    ...activePengumuman,
  ];

  // Kecepatan: semakin banyak item, semakin lambat agar nyaman dibaca
  const speed = Math.max(20, activePengumuman.length * 12);

  return (
    <>
      {/* CSS keyframe injected inline — seamless infinite scroll */}
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll ${speed}s linear infinite;
          will-change: transform;
        }
        .ticker-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="fixed top-0 left-0 right-0 z-60 flex items-stretch h-8"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.10 0.04 240) 0%, oklch(0.18 0.09 162) 50%, oklch(0.10 0.04 240) 100%)",
          borderBottom: "1px solid oklch(0.50 0.17 162 / 0.25)",
        }}
      >
        {/* Label kiri */}
        <div
          className="flex items-center gap-1.5 px-3 shrink-0 text-xs font-bold text-white/90 border-r z-10"
          style={{ borderColor: "oklch(0.50 0.17 162 / 0.30)" }}
        >
          <Megaphone className="h-3 w-3 shrink-0" style={{ color: "oklch(0.82 0.13 85)" }} />
          <span className="hidden sm:block" style={{ color: "oklch(0.82 0.13 85)" }}>
            PENGUMUMAN
          </span>
        </div>

        {/* Ticker area */}
        <div
          className="flex-1 overflow-hidden relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left fade mask */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, oklch(0.10 0.04 240), transparent)" }}
          />
          {/* Right fade mask */}
          <div
            className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, oklch(0.10 0.04 240), transparent)" }}
          />

          {/* 
            Scrolling track — pure CSS animation.
            Kuncinya: width = 200% (2 set item), kita scroll dari 0 ke -50%.
            Karena set ke-2 identik dengan set ke-1, pada titik -50% tampilan
            persis sama dengan titik 0%, sehingga reset tidak pernah terlihat.
          */}
          <div
            className={`ticker-track${paused ? " paused" : ""} flex items-center h-full`}
            style={{ width: "max-content" }}
          >
            {items.map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                href={item.href}
                className="flex items-center shrink-0 px-8 text-xs text-white/75 hover:text-white transition-colors duration-200 whitespace-nowrap gap-2 h-full"
              >
                <span
                  className="inline-block h-1 w-1 rounded-full shrink-0"
                  style={{ background: "oklch(0.82 0.13 85)" }}
                />
                {item.teks}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
