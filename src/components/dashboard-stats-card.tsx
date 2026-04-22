"use client";

import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export interface StatItem {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  variant?: StatVariant;
  trend?: string;
  trendDown?: boolean;
}

// ─── Accent colors only (no background tinting) ───────────────────────────────

const ACCENT: Record<StatVariant, { icon: string; bar: string; trend: string }> = {
  default: {
    icon: "bg-primary/10 text-primary",
    bar: "bg-primary",
    trend: "text-primary",
  },
  success: {
    icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
    trend: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    bar: "bg-amber-500",
    trend: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    icon: "bg-red-500/10 text-red-600 dark:text-red-400",
    bar: "bg-red-500",
    trend: "text-red-600 dark:text-red-400",
  },
  muted: {
    icon: "bg-muted text-muted-foreground",
    bar: "bg-border",
    trend: "text-muted-foreground",
  },
};

// ─── Single Card ─────────────────────────────────────────────────────────────

export function DashboardStatCard({
  value,
  label,
  icon: Icon,
  variant = "default",
  trend,
  trendDown = false,
}: StatItem) {
  const accent = ACCENT[variant];

  return (
    <div className="group relative rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Accent top bar */}
      <div className={cn("absolute inset-x-0 top-0 h-[3px]", accent.bar)} />

      <div className="px-5 pt-6 pb-5 flex flex-col gap-3">
        {/* Icon + Value row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-3xl font-black text-foreground leading-none tracking-tight">
              {value}
            </span>
            <span className="text-xs font-semibold text-muted-foreground mt-2 leading-tight">
              {label}
            </span>
          </div>

          {Icon && (
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                accent.icon
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Trend */}
        {trend && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold pt-1 border-t border-border/40">
            {trendDown ? (
              <TrendingDown className="h-3 w-3 text-red-500 shrink-0" />
            ) : (
              <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />
            )}
            <span className={trendDown ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}>
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Grid Wrapper ─────────────────────────────────────────────────────────────

interface DashboardStatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function DashboardStatsGrid({
  stats,
  columns = 4,
  className,
}: DashboardStatsGridProps) {
  const colClass: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", colClass[columns], className)}>
      {stats.map((stat, i) => (
        <DashboardStatCard key={i} {...stat} />
      ))}
    </div>
  );
}
