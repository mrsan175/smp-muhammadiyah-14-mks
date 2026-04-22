"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, FileText, ClipboardList } from "lucide-react";
import { DashboardStatsGrid, type StatItem } from "@/components/dashboard-stats-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Overview Dashboard</h2>
                <p className="text-muted-foreground">
                    Ringkasan data dan aktivitas harian sekolah.
                </p>
            </div>

            {/* Statistik */}
            <DashboardStatsGrid columns={4} stats={[
              { title: "Total Siswa", value: "350", desc: "+12 bulan ini", icon: Users },
              { title: "Total Guru", value: "32", desc: "+2 bulan ini", icon: GraduationCap },
              { title: "Pendaftar PPDB", value: "124", desc: "Tahun Ajaran 2026/2027", icon: ClipboardList },
              { title: "Kegiatan & Berita", value: "48", desc: "+5 bulan ini", icon: FileText },
            ].map((s) => ({
              value: s.value,
              label: s.title,
              icon: s.icon,
              trend: s.desc,
              variant: s.desc.startsWith("+") ? "success" : "default",
            } as StatItem)) satisfies StatItem[]} />

            {/* Tabel & Daftar */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Pendaftar PPDB Terbaru</CardTitle>
                        <CardDescription>
                            Ada 12 pendaftar baru yang menunggu verifikasi minggu ini.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="font-semibold text-foreground">Nama Peserta</TableHead>
                                    <TableHead className="font-semibold text-foreground">Asal Sekolah</TableHead>
                                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-foreground">Tanggal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { nama: "Ahmad Faisal", asal: "SDN 12 Makassar", status: "Verified", date: "21 Apr" },
                                    { nama: "Siti Humairah", asal: "SD Inpres Antang", status: "Pending", date: "20 Apr" },
                                    { nama: "Budi Santoso", asal: "SDN 5 Makassar", status: "Verified", date: "19 Apr" },
                                    { nama: "Nurul Hidayah", asal: "MIN 1 Makassar", status: "Rejected", date: "18 Apr" },
                                    { nama: "Dian Pelangi", asal: "SD IT Al-Fityan", status: "Pending", date: "18 Apr" },
                                ].map((row, i) => (
                                    <TableRow key={i} className="hover:bg-muted/30">
                                        <TableCell className="font-medium">{row.nama}</TableCell>
                                        <TableCell className="text-muted-foreground text-sm">{row.asal}</TableCell>
                                        <TableCell>
                                            <Badge variant={row.status === "Verified" ? "default" : row.status === "Pending" ? "secondary" : "destructive"} className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                                                {row.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-sm font-medium text-muted-foreground">{row.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Aktivitas Log</CardTitle>
                        <CardDescription>
                            Riwayat login sistem terakhir.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { user: "Admin", action: "Login berhasil", time: "Baru saja", ip: "192.168.1.1" },
                                { user: "Admin", action: "Login berhasil", time: "2 jam lalu", ip: "114.122.34.12" },
                                { user: "Guru Olahraga", action: "Gagal login", time: "Kemarin", ip: "118.99.12.5" },
                                { user: "Admin", action: "Update pengaturan", time: "2 hari lalu", ip: "114.122.34.12" },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full border bg-muted/30 shrink-0 group-hover:bg-primary/10 transition-colors">
                                        <Users className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="ml-1 space-y-1">
                                        <p className="text-sm font-bold leading-none text-foreground">{log.user}</p>
                                        <p className="text-xs text-muted-foreground font-medium">
                                            {log.action} <span className="opacity-50">•</span> {log.ip}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                                        {log.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}