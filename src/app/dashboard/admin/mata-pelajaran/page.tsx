"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus, Trash2, Loader2, BookOpen,
  MoreHorizontal, Pencil,
} from "lucide-react";

import { useAdminUIStore } from "@/lib/store";
import {
  getMataPelajaranAction,
  createMataPelajaranAction,
  updateMataPelajaranAction,
  deleteMataPelajaranAction,
} from "@/actions/mata-pelajaran";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DashboardStatsGrid } from "@/components/dashboard-stats-card";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const mapelSchema = z.object({
  nama: z.string().min(2, "Nama mata pelajaran minimal 2 karakter"),
  kode: z.string().optional(),
});

type FormValues = z.infer<typeof mapelSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1.5">⚠ {message}</p>;
}

export default function MataPelajaranAdminPage() {
  const { data: mapelList, mutate, isLoading } = useSWR("mapel_admin", getMataPelajaranAction);
  const { isFormOpen, setFormOpen, selectedItem, setSelectedItem } = useAdminUIStore();

  const isEditing = !!selectedItem;
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(mapelSchema),
      defaultValues: { nama: "", kode: "" },
    });

  const handleOpenCreate = () => {
    setSelectedItem(null);
    reset({ nama: "", kode: "" });
    setFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setSelectedItem(item);
    reset({ nama: item.nama, kode: item.kode ?? "" });
    setFormOpen(true);
  };

  const onSubmit = async (values: FormValues) => {
    const result = isEditing
      ? await updateMataPelajaranAction(selectedItem.id, values)
      : await createMataPelajaranAction(values);

    if (result?.error) { toast.error(result.error); return; }
    toast.success(isEditing ? "Mata pelajaran diperbarui" : "Mata pelajaran ditambahkan");
    setFormOpen(false); setSelectedItem(null); mutate();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const result = await deleteMataPelajaranAction(deleteTarget);
    setIsDeleting(false);
    if (result?.error) { toast.error(result.error); return; }
    toast.success("Mata pelajaran dihapus");
    setDeleteTarget(null); mutate();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Hapus Mata Pelajaran?"
        description="Mata pelajaran ini akan dihapus. Slot jadwal yang mengacu ke mata pelajaran ini akan menjadi kosong."
        confirmLabel="Ya, Hapus" isLoading={isDeleting} onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mata Pelajaran</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola daftar mata pelajaran. Akan tersedia sebagai pilihan saat menyusun jadwal pelajaran.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 shrink-0 shadow-sm">
          <Plus className="h-4 w-4" /> Tambah Mata Pelajaran
        </Button>
      </div>

      {/* Stats */}
      <DashboardStatsGrid columns={2} stats={[
        { value: mapelList?.length ?? 0,                           label: "Total Mata Pelajaran", icon: BookOpen, variant: "default" },
        { value: mapelList?.filter((m) => !!m.kode).length ?? 0,  label: "Dengan Kode Mapel",    icon: BookOpen, variant: "success" },
      ]} />

      {/* Table */}
      <Card className="shadow-sm border-border/60 p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-5 font-semibold text-foreground">Nama Mata Pelajaran</TableHead>
                <TableHead className="font-semibold text-foreground w-[140px]">Kode</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-5 w-[60px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-5"><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : !mapelList?.length ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-16 text-muted-foreground text-sm">
                    Belum ada mata pelajaran. Klik <strong>Tambah Mata Pelajaran</strong> untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                mapelList.map((item, i) => (
                  <TableRow key={item.id} className="hover:bg-muted/20">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-black">
                          {i + 1}
                        </div>
                        <span className="font-semibold text-sm">{item.nama}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.kode
                        ? <Badge variant="outline" className="font-mono text-[10px] font-bold tracking-widest">{item.kode}</Badge>
                        : <span className="text-muted-foreground italic text-sm opacity-50">—</span>
                      }
                    </TableCell>
                    <TableCell className="text-right pr-5">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEdit(item)}>
                            <Pencil className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
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
            <SheetTitle>{isEditing ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}</SheetTitle>
            <SheetDescription>Mata pelajaran ini akan tersedia sebagai pilihan di form jadwal pelajaran.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nama" className="text-sm font-semibold">Nama Mata Pelajaran <span className="text-destructive">*</span></Label>
                <Input id="nama" placeholder="Contoh: Matematika, Bahasa Indonesia" {...register("nama")} />
                <FieldError message={errors.nama?.message} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="kode" className="text-sm font-semibold">Kode Mata Pelajaran <span className="text-muted-foreground font-normal">(opsional)</span></Label>
                <Input id="kode" placeholder="Contoh: MTK, B.IND, IPA" {...register("kode")} className="uppercase" />
                <p className="text-xs text-muted-foreground">Kode singkat akan ditampilkan sebagai label di tabel.</p>
              </div>
            </div>

            <div className="shrink-0 border-t px-6 py-4 flex items-center justify-end gap-2 bg-muted/30">
              <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setSelectedItem(null); }} disabled={isSubmitting}>Batal</Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isEditing ? "Simpan Perubahan" : "Tambah"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
