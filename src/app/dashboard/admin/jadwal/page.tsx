"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus, Trash2, Loader2, Clock,
  Coffee, MoreHorizontal, Pencil,
  BookOpen,
  DoorOpen,
} from "lucide-react";

import { useAdminUIStore } from "@/lib/store";
import { getAllJadwalAction, createJadwalAction, updateJadwalAction, deleteJadwalAction } from "@/actions/jadwal";
import { getGuruAction } from "@/actions/guru";
import { getMataPelajaranAction } from "@/actions/mata-pelajaran";
import { getKelasAction } from "@/actions/kelas";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DashboardStatsGrid } from "@/components/dashboard-stats-card";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"] as const;
type Hari = typeof HARI[number];

const HARI_COLORS: Record<Hari, string> = {
  Senin: "bg-blue-100 text-blue-700 border-blue-200",
  Selasa: "bg-violet-100 text-violet-700 border-violet-200",
  Rabu: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Kamis: "bg-amber-100 text-amber-700 border-amber-200",
  Jumat: "bg-rose-100 text-rose-700 border-rose-200",
};

const jadwalSchema = z.object({
  kelas: z.string().min(1, "Kelas wajib diisi"),
  hari: z.enum(HARI),
  jamMulai: z.string().min(1, "Jam mulai wajib diisi"),
  jamSelesai: z.string().min(1, "Jam selesai wajib diisi"),
  urutan: z.number({ message: "Urutan harus berupa angka" }).min(1),
  mapelId: z.string().nullable().optional(),
  guruId: z.string().nullable().optional(),
  isIstirahat: z.boolean(),
  labelIstirahat: z.string().optional(),
});

type FormValues = z.infer<typeof jadwalSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1.5">⚠ {message}</p>;
}

export default function JadwalAdminPage() {
  const { data: allJadwal, mutate, isLoading } = useSWR("jadwal_admin", getAllJadwalAction);
  const { data: guruList = [] } = useSWR("guru_list", getGuruAction);
  const { data: mapelList = [] } = useSWR("mapel_list", getMataPelajaranAction);
  const { data: kelasList = [] } = useSWR("kelas_list", getKelasAction);
  const { isFormOpen, setFormOpen, selectedItem, setSelectedItem } = useAdminUIStore();

  const isEditing = !!selectedItem;
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filterKelas, setFilterKelas] = useState<string>("all");

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(jadwalSchema),
      defaultValues: {
        kelas: "", hari: "Senin", jamMulai: "07:15", jamSelesai: "08:35",
        urutan: 1, mapelId: null, guruId: null, isIstirahat: false, labelIstirahat: "",
      },
    });

  const isIstirahat = watch("isIstirahat");
  const watchedKelas = watch("kelas");
  const watchedHari = watch("hari");

  const handleOpenCreate = () => {
    setSelectedItem(null);
    reset({ kelas: "", hari: "Senin", jamMulai: "07:15", jamSelesai: "08:35", urutan: 1, mapelId: null, guruId: null, isIstirahat: false, labelIstirahat: "" });
    setFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setSelectedItem(item);
    reset({
      kelas: item.kelas, hari: item.hari,
      jamMulai: item.jamMulai, jamSelesai: item.jamSelesai,
      urutan: item.urutan, mapelId: item.mapelId ?? null,
      guruId: item.guruId ?? null, isIstirahat: item.isIstirahat ?? false,
      labelIstirahat: item.labelIstirahat ?? "",
    });
    setFormOpen(true);
  };

  const onSubmit = async (values: FormValues) => {
    const result = isEditing
      ? await updateJadwalAction(selectedItem.id, values)
      : await createJadwalAction(values);

    if (result?.error) { toast.error(result.error); return; }
    toast.success(isEditing ? "Jadwal diperbarui" : "Jadwal ditambahkan");
    setFormOpen(false); setSelectedItem(null); mutate();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const result = await deleteJadwalAction(deleteTarget);
    setIsDeleting(false);
    if (result?.error) { toast.error(result.error); return; }
    toast.success("Jadwal dihapus");
    setDeleteTarget(null); mutate();
  };

  const kelasFilterOptions = [...new Set(allJadwal?.map((j) => j.kelas) ?? [])].sort();
  const totalSlot = allJadwal?.filter((j) => !j.isIstirahat).length ?? 0;
  const totalIstirahat = allJadwal?.filter((j) => j.isIstirahat).length ?? 0;
  const displayed = filterKelas === "all" ? (allJadwal ?? []) : (allJadwal ?? []).filter((j) => j.kelas === filterKelas);

  // Urutan yang sudah terpakai untuk kelas + hari yang sedang dipilih di form
  const takenUrutan = new Set(
    (allJadwal ?? [])
      .filter((j) =>
        j.kelas === watchedKelas &&
        j.hari === watchedHari &&
        j.id !== selectedItem?.id
      )
      .map((j) => j.urutan)
  );
  const availableUrutan = Array.from({ length: 16 }, (_, i) => i + 1).filter(
    (n) => !takenUrutan.has(n)
  );

  // Jam yang sudah terpakai untuk kelas + hari yang sedang dipilih di form
  const takenJam = (allJadwal ?? []).filter(
    (j) => j.kelas === watchedKelas && j.hari === watchedHari && j.id !== selectedItem?.id
  );
  const isJamMulaiConflict = !!watch("jamMulai") && takenJam.some((j) => j.jamMulai === watch("jamMulai"));
  const isJamSelesaiConflict = !!watch("jamSelesai") && takenJam.some((j) => j.jamSelesai === watch("jamSelesai"));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Hapus Jadwal?" description="Baris jadwal ini akan dihapus secara permanen."
        confirmLabel="Ya, Hapus" isLoading={isDeleting} onConfirm={confirmDelete}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Jadwal Pelajaran</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Atur jadwal per kelas. Tampil di halaman <span className="font-semibold text-foreground">/akademik/jadwal</span>.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 shrink-0 shadow-sm">
          <Plus className="h-4 w-4" /> Tambah Jadwal
        </Button>
      </div>

      <DashboardStatsGrid columns={3} stats={[
        { value: kelasFilterOptions.length, label: "Kelas Terjadwal", icon: DoorOpen, variant: "default" },
        { value: totalSlot, label: "Mata Pelajaran", icon: BookOpen, variant: "success" },
        { value: totalIstirahat, label: "Agenda Khusus", icon: Coffee, variant: "warning" },
      ]} />

      <Card className="shadow-sm border-border/60 p-0">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60">
          <p className="text-sm font-semibold text-muted-foreground shrink-0">Filter Kelas:</p>
          <Select value={filterKelas} onValueChange={setFilterKelas}>
            <SelectTrigger className="w-48 h-9">
              <SelectValue placeholder="Semua Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              {kelasFilterOptions.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground ml-auto">{displayed.length} baris</span>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-5 font-semibold text-foreground w-[90px]">Kelas</TableHead>
                <TableHead className="font-semibold text-foreground w-[90px]">Hari</TableHead>
                <TableHead className="font-semibold text-foreground w-[140px]">Waktu</TableHead>
                <TableHead className="font-semibold text-foreground">Mata Pelajaran</TableHead>
                <TableHead className="font-semibold text-foreground hidden md:table-cell">Guru</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-5 w-[60px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(5)].map((__, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}
                    <TableCell />
                  </TableRow>
                ))
              ) : displayed.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-16 text-muted-foreground text-sm">
                    Belum ada jadwal. Klik <strong>Tambah Slot</strong> untuk mulai.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((item) => (
                  <TableRow key={item.id} className={item.isIstirahat ? "bg-muted/20 italic" : "hover:bg-muted/20"}>
                    <TableCell className="pl-5 font-bold text-sm">{item.kelas}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] font-bold uppercase ${HARI_COLORS[item.hari as Hari] ?? ""}`}>
                        {item.hari}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">
                      <Clock className="inline h-3 w-3 mr-1 opacity-60" />{item.jamMulai} – {item.jamSelesai}
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.isIstirahat
                        ? <span className="flex items-center gap-1.5 text-muted-foreground">{item.labelIstirahat || "Agenda Khusus"}</span>
                        : <span className="font-medium">{item.mapelNama ?? <span className="text-muted-foreground italic">—</span>}</span>
                      }
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {item.guruNama || <span className="italic opacity-50">—</span>}
                    </TableCell>
                    <TableCell className="text-right pr-5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEdit(item)}><Pencil className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setDeleteTarget(item.id)} className="text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" /> Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Sheet */}
      <Sheet open={isFormOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) setSelectedItem(null); }}>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle>{isEditing ? "Edit Data Jadwal" : "Tambah Data Jadwal"}</SheetTitle>
            <SheetDescription>Isi detail jadwal pelajaran untuk kelas.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

              {/* Kelas */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">Kelas</Label>
                {kelasList.length === 0 ? (
                  <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    ⚠ Belum ada kelas. Tambahkan dulu di menu <strong>Daftar Kelas</strong>.
                  </p>
                ) : (
                  <Select onValueChange={(v) => setValue("kelas", v)} value={watch("kelas")}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Pilih kelas" /></SelectTrigger>
                    <SelectContent>
                      {kelasList.map((k) => (
                        <SelectItem key={k.id} value={k.nama}>Kelas {k.nama}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <FieldError message={errors.kelas?.message} />
              </div>

              {/* Hari */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">Hari</Label>
                <Select onValueChange={(v) => setValue("hari", v as Hari)} value={watch("hari")}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Pilih hari" /></SelectTrigger>
                  <SelectContent>{HARI.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              {/* Jam */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="jamMulai" className="text-sm font-semibold">Jam Mulai</Label>
                  <Input
                    id="jamMulai"
                    placeholder="07:15"
                    {...register("jamMulai")}
                    className={`w-full ${isJamMulaiConflict ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {isJamMulaiConflict && (
                    <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                      ⚠ Jam mulai <strong>{watch("jamMulai")}</strong> sudah dipakai di kelas {watchedKelas} hari {watchedHari}.
                    </p>
                  )}
                  <FieldError message={errors.jamMulai?.message} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="jamSelesai" className="text-sm font-semibold">Jam Selesai</Label>
                  <Input
                    id="jamSelesai"
                    placeholder="08:35"
                    {...register("jamSelesai")}
                    className={`w-full ${isJamSelesaiConflict ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {isJamSelesaiConflict && (
                    <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                      ⚠ Jam selesai <strong>{watch("jamSelesai")}</strong> sudah dipakai di kelas {watchedKelas} hari {watchedHari}.
                    </p>
                  )}
                  <FieldError message={errors.jamSelesai?.message} />
                </div>
              </div>

              {/* Urutan */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">Urutan</Label>
                {!watchedKelas || !watchedHari ? (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
                    Pilih kelas dan hari terlebih dahulu.
                  </p>
                ) : availableUrutan.length === 0 ? (
                  <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    Semua urutan untuk kelas <strong>{watchedKelas}</strong> hari <strong>{watchedHari}</strong> sudah terpakai.
                  </p>
                ) : (
                  <Select
                    onValueChange={(v) => setValue("urutan", Number(v))}
                    value={watch("urutan") ? String(watch("urutan")) : ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih nomor urutan" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableUrutan.map((n) => (
                        <SelectItem key={n} value={String(n)}>Urutan ke-{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <FieldError message={errors.urutan?.message} />
              </div>

              {/* isIstirahat toggle */}
              <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
                <Checkbox id="isIstirahat" checked={isIstirahat} onCheckedChange={(v) => setValue("isIstirahat", !!v)} className="mt-0.5" />
                <div>
                  <Label htmlFor="isIstirahat" className="text-sm font-semibold cursor-pointer">Tandai sebagai Agenda Khusus</Label>
                  <p className="text-[11px] text-muted-foreground">Agenda khusus ditampilkan sebagai pemisah — cocok untuk upacara, istirahat, sholat, dll.</p>
                </div>
              </div>

              {isIstirahat ? (
                // Label istirahat
                <div className="space-y-1.5">
                  <Label htmlFor="labelIstirahat" className="text-sm font-semibold">Nama / Keterangan Agenda</Label>
                  <Input id="labelIstirahat" placeholder="Contoh: Upacara, Istirahat, Sholat Dzuhur" {...register("labelIstirahat")} />
                </div>
              ) : (
                <>
                  {/* Mata Pelajaran dropdown */}
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">Mata Pelajaran</Label>
                    {mapelList.length === 0 ? (
                      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        ⚠ Belum ada mata pelajaran. Tambahkan dulu di menu <strong>Mata Pelajaran</strong>.
                      </p>
                    ) : (
                      <Select onValueChange={(v) => setValue("mapelId", v === "none" ? null : v)} value={watch("mapelId") ?? "none"}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Pilih mata pelajaran" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— Tidak ada —</SelectItem>
                          {mapelList.map((m) => <SelectItem key={m.id} value={m.id}>{m.nama}{m.kode ? ` (${m.kode})` : ""}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Guru dropdown */}
                  <div className="space-y-1.5">
                    <Label className="text-sm font-semibold">Guru Pengampu</Label>
                    {guruList.length === 0 ? (
                      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        ⚠ Belum ada data guru. Tambahkan dulu di menu <strong>Data Guru</strong>.
                      </p>
                    ) : (
                      <Select onValueChange={(v) => setValue("guruId", v === "none" ? null : v)} value={watch("guruId") ?? "none"}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Pilih guru" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">— Tidak ada —</SelectItem>
                          {guruList.map((g) => <SelectItem key={g.id} value={g.id}>{g.nama}{g.jabatan ? ` — ${g.jabatan}` : ""}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="shrink-0 border-t px-6 py-4 flex items-center justify-end gap-2 bg-muted/30">
              <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setSelectedItem(null); }} disabled={isSubmitting}>Batal</Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isEditing ? "Simpan Perubahan" : "Tambah Jadwal"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
