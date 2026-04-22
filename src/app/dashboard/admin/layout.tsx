"use client";

import { useState, useCallback } from "react";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  UserSquare2,
  GraduationCap,
  Megaphone,
  ClipboardList,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
  FileText,
  CalendarDays,
  BookOpen,
  DoorOpen,
  Maximize,
  Minimize,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/actions/auth";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Users, label: "Data Siswa", href: "/dashboard/admin/siswa" },
  { icon: UserSquare2, label: "Data Guru", href: "/dashboard/admin/guru" },
  { icon: DoorOpen, label: "Daftar Kelas", href: "/dashboard/admin/kelas" },
  { icon: BookOpen, label: "Mata Pelajaran", href: "/dashboard/admin/mata-pelajaran" },
  { icon: CalendarDays, label: "Jadwal Pelajaran", href: "/dashboard/admin/jadwal" },
  { icon: FileText, label: "Tulisan Kegiatan", href: "/dashboard/admin/kegiatan" },
  { icon: Megaphone, label: "Pengumuman", href: "/dashboard/admin/pengumuman" },
  { icon: ClipboardList, label: "Pendaftar PPDB", href: "/dashboard/admin/ppdb" },
  { icon: Settings, label: "Pengaturan", href: "/dashboard/admin/pengaturan" },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-16 items-center border-b px-6 shrink-0">
        <Link href="/dashboard/admin" className="flex items-center gap-3 font-bold text-lg hover:opacity-80 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Admin Panel
          </span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-6">
        <nav className="grid gap-1 px-4">
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Menu Utama
          </p>
          {SIDEBAR_ITEMS.map((item, index) => {
            const active = pathname === item.href;
            return (
              <Button
                key={index}
                variant={active ? "secondary" : "ghost"}
                className={cn("justify-start gap-3 h-11 px-3", active && "bg-primary/10 text-primary font-semibold hover:bg-primary/15")}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <Button
          variant="ghost"
          onClick={() => logoutAction()}
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>
    </div>
  );
}

function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggle = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
      className="h-9 w-9 text-muted-foreground hover:text-foreground"
    >
      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
    </Button>
  );
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50/50">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-background md:block md:w-[260px] lg:w-[280px] shrink-0 h-screen sticky top-0 shadow-sm z-10">
        <SidebarContent />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-8 sticky top-0 z-30 shadow-sm shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetTitle className="sr-only">Navigasi Sidebar</SheetTitle>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <FullscreenButton />

          <div className="w-full flex-1" />

          <div className="flex items-center gap-2 border-l pl-4 ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-4 cursor-pointer outline-none">
                  <div className="hidden sm:flex flex-col items-end text-sm group">
                    <span className="font-semibold leading-none group-hover:text-primary transition-colors">Admin Sekolah</span>
                    <span className="text-xs text-muted-foreground mt-1">admin@smpm14.sch.id</span>
                  </div>
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all select-none">
                    <AvatarImage src="" alt="Admin" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">AD</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin Sekolah</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@smpm14.sch.id
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/admin/profil">
                    <UserSquare2 className="mr-2 h-4 w-4" />
                    Profil Saya
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard/admin/pengaturan">
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                  onClick={() => logoutAction()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
