"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus, Trash2, Loader2, FileText,
  CalendarDays, Tag, AlignLeft, BookOpen,
  ImageIcon, MoreHorizontal, Pencil,
  BookOpenCheck, Dumbbell, HeartHandshake, Moon, Trophy,
} from "lucide-react";
import Image from "next/image";
import { useAdminUIStore } from "@/lib/store";
import { getKegiatanAction, createKegiatanAction, deleteKegiatanAction, updateKegiatanAction } from "@/actions/kegiatan";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageUpload } from "@/components/image-upload";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DashboardStatsGrid, type StatItem } from "@/components/dashboard-stats-card";
import { toast } from "sonner";

const KATEGORI_COLORS: Record<string, string> = {
  Akademik: "bg-blue-100 text-blue-700 border-blue-200",
  Ekskul: "bg-purple-100 text-purple-700 border-purple-200",
  Sosial: "bg-green-100 text-green-700 border-green-200",
  Agama: "bg-amber-100 text-amber-700 border-amber-200",
  Prestasi: "bg-rose-100 text-rose-700 border-rose-200",
};

const kegiatanSchema = z.object({
  judul: z.string().min(5, "Judul minimal 5 karakter"),
  ringkasan: z.string().min(10, "Ringkasan minimal 10 karakter"),
  konten: z.string().min(20, "Isi konten minimal 20 karakter"),
  kategori: z.enum(["Akademik", "Ekskul", "Sosial", "Agama", "Prestasi"]),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  gambar: z.string().min(1, "Gambar wajib diupload"),
});

type FormValues = z.infer<typeof kegiatanSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1.5">⚠ {message}</p>;
}

export default function KegiatanAdminPage() {
  const { data: kegiatan, mutate, isLoading } = useSWR("kegiatan_admin", () => getKegiatanAction());
  const { isFormOpen, setFormOpen, selectedItem, setSelectedItem } = useAdminUIStore();

  const isEditing = !!selectedItem;
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(kegiatanSchema),
    defaultValues: {
      judul: "", ringkasan: "", konten: "",
      kategori: "Akademik",
      tanggal: new Date().toISOString().split("T")[0],
      gambar: "",
    },
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (selectedItem) {
      reset({
        judul: selectedItem.judul,
        ringkasan: selectedItem.ringkasan,
        konten: selectedItem.konten,
        kategori: selectedItem.kategori,
        tanggal: new Date(selectedItem.tanggal).toISOString().split("T")[0],
        gambar: selectedItem.gambar,
      });
    } else {
      reset({
        judul: "", ringkasan: "", konten: "",
        kategori: "Akademik",
        tanggal: new Date().toISOString().split("T")[0],
        gambar: "",
      });
    }
  }, [selectedItem, reset]);

  const handleOpenCreate = () => {
    setSelectedItem(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setSelectedItem(item);
    setFormOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    if (isEditing) {
      const res = await updateKegiatanAction(selectedItem.id, data);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Kegiatan berhasil diperbarui!");
    } else {
      const res = await createKegiatanAction(data);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Kegiatan berhasil dipublish!");
    }
    setFormOpen(false);
    setSelectedItem(null);
    mutate();
  };

  const handleDelete = async (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    mutate(kegiatan?.filter((k) => k.id !== deleteTarget), false);
    const res = await deleteKegiatanAction(deleteTarget);
    if (res.error) toast.error(res.error);
    else toast.success("Artikel berhasil dihapus.");
    mutate();
    setDeleteTarget(null);
    setIsDeleting(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Hapus Artikel Kegiatan?"
        description="Artikel ini akan dihapus secara permanen dan tidak dapat dikembalikan. Pastikan Anda yakin sebelum melanjutkan."
        confirmLabel="Ya, Hapus Artikel"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Postingan Kegiatan</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola berita, kegiatan, dan pencapaian sekolah yang tampil di halaman publik.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 shrink-0 shadow-sm">
          <Plus className="h-4 w-4" />
          Tambah Kegiatan Baru
        </Button>
      </div>

      {/* Stat summary */}
      <DashboardStatsGrid columns={4} stats={(function () {
        const all = kegiatan?.length ?? 0;
        const akademik = kegiatan?.filter((k) => k.kategori === "Akademik").length ?? 0;
        const ekskul = kegiatan?.filter((k) => k.kategori === "Ekskul").length ?? 0;
        const agama = kegiatan?.filter((k) => k.kategori === "Agama").length ?? 0;
        const lainnya = (kegiatan?.filter((k) => !["Akademik", "Ekskul", "Agama"].includes(k.kategori)).length ?? 0);
        return [
          { value: all, label: "Total Kegiatan", icon: FileText, variant: "default" },
          { value: akademik, label: "Akademik", icon: BookOpenCheck, variant: "success" },
          { value: ekskul, label: "Ekskul", icon: Dumbbell, variant: "warning" },
          { value: agama + lainnya, label: "Agama & Lainnya", icon: Moon, variant: "muted" },
        ] as StatItem[];
      })()} />

      {/* Table */}
      <Card className="shadow-sm border-border/60 p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-[45%] font-semibold text-foreground pl-5">Artikel</TableHead>
                <TableHead className="font-semibold text-foreground">Kategori</TableHead>
                <TableHead className="font-semibold text-foreground">Tanggal</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-5 w-[80px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-16 rounded-lg shrink-0" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right pr-5"><Skeleton className="h-8 w-8 rounded ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : !kegiatan?.length ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <FileText className="h-10 w-10 opacity-30" />
                      <div>
                        <p className="font-medium">Belum ada artikel</p>
                        <p className="text-sm mt-1">Klik "Tulis Artikel Baru" untuk membuat postingan pertama.</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                kegiatan.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0 border border-border/50">
                          <Image src={item.gambar} alt={item.judul} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground leading-snug line-clamp-1">{item.judul}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.ringkasan}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${KATEGORI_COLORS[item.kategori]}`}>
                        {item.kategori}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground font-medium">
                      {new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 data-[state=open]:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            onClick={() => handleOpenEdit(item)}
                          >
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                            Edit Artikel
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Hapus Artikel
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
        <SheetContent side="right" className="w-full sm:max-w-2xl flex flex-col p-0 gap-0">
          <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isEditing ? "bg-slate-100 border border-slate-300" : "bg-primary/10"}`}>
                {isEditing
                  ? <Pencil className="h-4 w-4 text-slate-600" />
                  : <Plus className="h-4 w-4 text-primary" />
                }
              </div>
              <div>
                <SheetTitle className="text-base font-bold leading-none">
                  {isEditing ? "Edit Artikel Kegiatan" : "Tulis Kegiatan Baru"}
                </SheetTitle>
                <SheetDescription className="text-xs mt-1">
                  {isEditing
                    ? `Memperbarui: "${selectedItem?.judul?.slice(0, 40)}${selectedItem?.judul?.length > 40 ? "..." : ""}"`
                    : <>Artikel akan tampil di <span className="font-mono bg-muted px-1 rounded">/kegiatan</span></>
                  }
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              <div className="space-y-1.5">
                <Label htmlFor="judul" className="flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground" /> Judul Artikel
                </Label>
                <Input id="judul" placeholder="Judul artikel..." className="h-11" {...register("judul")} />
                <FieldError message={errors.judul?.message} />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" /> Kategori
                </Label>
                <Select
                  value={watch("kategori")}
                  onValueChange={(val: FormValues["kategori"]) => setValue("kategori", val)}
                >
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Akademik", "Ekskul", "Sosial", "Agama", "Prestasi"].map((k) => (
                      <SelectItem key={k} value={k}>{k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError message={errors.kategori?.message} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tanggal" className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" /> Tanggal Pelaksanaan
                </Label>
                <Input type="date" id="tanggal" className="h-11 w-full" {...register("tanggal")} />
                <FieldError message={errors.tanggal?.message} />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-semibold">
                  <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" /> Gambar Thumbnail
                  <span className="ml-auto text-xs text-muted-foreground font-semibold">Maks. 500KB</span>
                </Label>
                <ImageUpload
                  value={watch("gambar")}
                  onChange={(url) => setValue("gambar", url, { shouldValidate: true })}
                />
                <FieldError message={errors.gambar?.message} />
              </div>

              <Separator />

              <div className="space-y-1.5">
                <Label htmlFor="ringkasan" className="flex items-center gap-2 text-sm font-semibold">
                  <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" /> Ringkasan
                  <span className="ml-auto text-xs font-normal text-muted-foreground">Tampil di kartu grid</span>
                </Label>
                <Textarea id="ringkasan" className="resize-none h-24" placeholder="Ringkasan singkat..." {...register("ringkasan")} />
                <FieldError message={errors.ringkasan?.message} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="konten" className="flex items-center gap-2 text-sm font-semibold">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" /> Isi Artikel Lengkap
                  <span className="ml-auto text-xs font-normal text-muted-foreground">Halaman detail</span>
                </Label>
                <Textarea id="konten" className="resize-none h-44" placeholder="Ceritakan selengkapnya..." {...register("konten")} />
                <FieldError message={errors.konten?.message} />
              </div>

            </div>

            <div className="shrink-0 border-t px-6 py-4 flex items-center justify-between bg-muted/30">
              <p className="text-xs text-muted-foreground">
                {isEditing ? "Perubahan akan langsung diterapkan" : "Artikel akan langsung dipublish"}
              </p>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setSelectedItem(null); }} disabled={isSubmitting}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting} className={`min-w-[140px] ${isEditing ? "bg-slate-800 hover:bg-slate-700 text-white" : ""}`}>
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</>
                  ) : isEditing ? "Simpan Perubahan" : "Publish Kegiatan"}
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
