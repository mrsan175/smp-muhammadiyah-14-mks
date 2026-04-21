"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  GraduationCap,
  ChevronDown,
  BookOpen,
  Users,
  Award,
  Phone,
  Home,
  Image as ImageIcon,
  Newspaper,
  ClipboardList,
} from "lucide-react";

// ─── Navigation config ────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Beranda", href: "/", icon: Home },
  {
    label: "Profil",
    href: "#",
    icon: Users,
    children: [
      { label: "Visi & Misi", href: "/profil/visi-misi", desc: "Cita-cita dan arah pendidikan" },
      { label: "Sejarah Sekolah", href: "/profil/sejarah", desc: "Perjalanan panjang SMP Muhammadiyah 14" },
      { label: "Struktur Organisasi", href: "/profil/struktur", desc: "Kepemimpinan dan tata kelola" },
      { label: "Guru & Staf", href: "/profil/guru-staf", desc: "Tenaga pendidik berpengalaman" },
    ],
  },
  {
    label: "Akademik",
    href: "#",
    icon: BookOpen,
    children: [
      { label: "Kurikulum", href: "/akademik/kurikulum", desc: "Struktur program belajar" },
      { label: "Mata Pelajaran", href: "/akademik/mata-pelajaran", desc: "Daftar bidang studi" },
      { label: "Jadwal", href: "/akademik/jadwal", desc: "Kalender dan jadwal belajar" },
    ],
  },
  { label: "Prestasi", href: "/prestasi", icon: Award },
  { label: "Galeri", href: "/galeri", icon: ImageIcon },
  {
    label: "Informasi",
    href: "#",
    icon: Newspaper,
    children: [
      { label: "Kegiatan", href: "/kegiatan", desc: "Berita & kegiatan sekolah terbaru" },
      { label: "Pengumuman", href: "/pengumuman", desc: "Informasi dan pengumuman resmi" },
      { label: "PPDB", href: "/ppdb", desc: "Penerimaan Peserta Didik Baru 2025/2026" },
    ],
  },
  { label: "Kontak", href: "/kontak", icon: Phone },
];

// ─── Hover Dropdown (desktop) ─────────────────────────────────────────────────

function HoverDropdown({
  item,
  scrolled,
}: {
  item: (typeof NAV_LINKS)[number];
  scrolled: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  const linkClass = cn(
    "relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-0",
    scrolled
      ? "text-foreground/80 hover:text-primary hover:bg-primary/10"
      : "text-white/90 hover:text-white hover:bg-white/10"
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <button className={linkClass}>
            {item.label}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </motion.span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          sideOffset={8}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="w-64 rounded-xl border border-border bg-card p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95"
        >
          {item.children?.map((child) => (
            <DropdownMenuItem
              key={child.href}
              asChild
              className="focus:bg-muted focus:text-foreground"
            >
              <Link
                href={child.href}
                className="flex flex-col items-start gap-0.5 rounded-lg px-3 py-2.5 cursor-pointer"
              >
                <span className="text-sm font-medium text-foreground">{child.label}</span>
                {"desc" in child && (
                  <span className="text-xs text-muted-foreground">{child.desc}</span>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Hanya halaman beranda yang punya hero gelap — halaman lain selalu pakai style scrolled
  const isHomePage = pathname === "/";

  React.useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return null;
  }

  const linkClass = (active?: boolean) =>
    cn(
      "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 outline-none",
      scrolled
        ? active
          ? "text-primary bg-primary/10"
          : "text-foreground/80 hover:text-primary hover:bg-primary/10"
        : active
          ? "text-white bg-white/15"
          : "text-white/90 hover:text-white hover:bg-white/10"
    );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={cn(
        "fixed top-8 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-card/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/25 transition-transform duration-200 group-hover:scale-105">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <p className={cn("text-sm font-bold tracking-tight transition-colors duration-300", scrolled ? "text-foreground" : "text-white")}>
                SMP Muhammadiyah 14
              </p>
              <p className={cn("text-[10px] font-medium transition-colors duration-300", scrolled ? "text-muted-foreground" : "text-white/60")}>
                Makassar
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map((item) => {
              if (item.children) {
                return (
                  <HoverDropdown key={item.label} item={item} scrolled={scrolled} />
                );
              }
              return (
                <Link key={item.href} href={item.href} className={linkClass(pathname === item.href)}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button
              asChild
              size="sm"
              variant={scrolled ? "default" : "outline"}
              className={cn(
                "gap-1.5 transition-all duration-200",
                scrolled
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                  : "border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              )}
            >
              <Link href="/ppdb">
                <ClipboardList className="h-3.5 w-3.5" />
                Daftar PPDB
              </Link>
            </Button>
          </div>

          {/* ── Mobile Menu ── */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                id="mobile-menu-trigger"
                className={cn(
                  "md:hidden rounded-xl transition-colors duration-200",
                  scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
                )}
              >
                <motion.div
                  animate={{ rotate: mobileOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="min-w-[300px] p-0 pb-8 flex flex-col mt-8">
              {/* Sheet header */}
              <div className="flex items-center gap-4 px-5 py-4 border-b border-border">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <SheetTitle className="text-sm font-bold text-foreground leading-tight">
                    SMP Muhammadiyah 14
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground">Makassar</p>
                </div>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
                {NAV_LINKS.map((item) => {
                  const Icon = item.icon;
                  if (item.children) {
                    return (
                      <MobileAccordion
                        key={item.label}
                        label={item.label}
                        icon={<Icon className="h-4 w-4 text-primary" />}
                        items={item.children}
                        onClose={() => setMobileOpen(false)}
                      />
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground/75 hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Sheet footer CTA */}
              <div className="p-4 border-t border-border">
                <Button asChild className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/ppdb" onClick={() => setMobileOpen(false)}>
                    <ClipboardList className="h-4 w-4" />
                    Daftar PPDB
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header >
  );
}

// ─── Mobile Accordion ─────────────────────────────────────────────────────────

function MobileAccordion({
  label,
  icon,
  items,
  onClose,
}: {
  label: string;
  icon: React.ReactNode;
  items: { label: string; href: string; desc?: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-muted transition-colors"
      >
        <span className="flex items-center gap-3">
          {icon}
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-4 border-l-2 border-primary/20 mt-1 mb-1 space-y-0.5">
              {items.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="flex flex-col gap-0.5 px-3 py-2 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                >
                  <span className="font-medium">{child.label}</span>
                  {child.desc && (
                    <span className="text-xs text-muted-foreground">{child.desc}</span>
                  )}
                </Link>
              ))}
            </div>
            <Separator className="my-1 mx-3" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
