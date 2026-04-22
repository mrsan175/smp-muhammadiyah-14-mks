"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus, Trash2, Loader2, UserSquare2,
  MoreHorizontal, Pencil, User,
} from "lucide-react";

import { useAdminUIStore } from "@/lib/store";
import { getAllGuruAction, createGuruAction, updateGuruAction, deleteGuruAction } from "@/actions/guru";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { DashboardStatsGrid } from "@/components/dashboard-stats-card";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const guruSchema = z.object({
  nama:    z.string().min(2, "Nama minimal 2 karakter"),
  nip:     z.string().optional(),
  jabatan: z.string().optional(),
});

type FormValues = z.infer<typeof guruSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1.5">⚠ {message}</p>;
}

export default function GuruAdminPage() {
  const { data: guruList, mutate, isLoading } = useSWR("guru_admin", getAllGuruAction);
  const { isFormOpen, setFormOpen, selectedItem, setSelectedItem } = useAdminUIStore();

  const isEditing = !!selectedItem;
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(guruSchema),
      defaultValues: { nama: "", nip: "", jabatan: "" },
    });

  const handleOpenCreate = () => {
    setSelectedItem(null);
    reset({ nama: "", nip: "", jabatan: "" });
    setFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setSelectedItem(item);
    reset({ nama: item.nama, nip: item.nip ?? "", jabatan: item.jabatan ?? "" });
    setFormOpen(true);
  };

  const onSubmit = async (values: FormValues) => {
    const result = isEditing
      ? await updateGuruAction(selectedItem.id, values)
      : await createGuruAction(values);

    if (result?.error) { toast.error(result.error); return; }
    toast.success(isEditing ? "Data guru diperbarui" : "Guru berhasil ditambahkan");
    setFormOpen(false); setSelectedItem(null); mutate();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const result = await deleteGuruAction(deleteTarget);
    setIsDeleting(false);
    if (result?.error) { toast.error(result.error); return; }
    toast.success("Guru berhasil dihapus");
    setDeleteTarget(null); mutate();
  };

  const activeCount = guruList?.filter((g) => g.isActive).length ?? 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Hapus Data Guru?"
        description="Data guru ini akan dihapus secara permanen. Slot jadwal yang mengacu ke guru ini akan menjadi kosong."
        confirmLabel="Ya, Hapus" isLoading={isDeleting} onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Data Guru</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola daftar guru. Nama guru yang ditambahkan di sini dapat dipilih saat menyusun jadwal pelajaran.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 shrink-0 shadow-sm">
          <Plus className="h-4 w-4" /> Tambah Guru
        </Button>
      </div>

      {/* Stats */}
      <DashboardStatsGrid columns={3} stats={[
        { value: guruList?.length ?? 0, label: "Total Guru",   icon: UserSquare2, variant: "default" },
        { value: activeCount,            label: "Aktif",         icon: User,        variant: "success" },
        { value: (guruList?.length ?? 0) - activeCount, label: "Nonaktif", icon: User, variant: "muted" },
      ]} />

      {/* Table */}
      <Card className="shadow-sm border-border/60 p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-5 font-semibold text-foreground w-[40%]">Nama Guru</TableHead>
                <TableHead className="font-semibold text-foreground">NIP</TableHead>
                <TableHead className="font-semibold text-foreground hidden md:table-cell">Jabatan / Mapel Ampuan</TableHead>
                <TableHead className="font-semibold text-foreground text-center w-[90px]">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-5 w-[60px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-5"><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-36" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 mx-auto rounded-full" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : !guruList?.length ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16 text-muted-foreground text-sm">
                    Belum ada data guru. Klik <strong>Tambah Guru</strong> untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                guruList.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/20">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-semibold text-sm">{item.nama}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground font-mono">
                      {item.nip || <span className="italic opacity-50">—</span>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {item.jabatan || <span className="italic opacity-50">—</span>}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={item.isActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold"
                          : "bg-slate-50 text-slate-500 border-slate-200 text-[10px] font-bold"
                        }
                      >
                        {item.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => updateGuruAction(item.id, { isActive: !item.isActive }).then(() => mutate())}>
                            {item.isActive ? "Nonaktifkan" : "Aktifkan"}
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
            <SheetTitle>{isEditing ? "Edit Data Guru" : "Tambah Guru Baru"}</SheetTitle>
            <SheetDescription>Isi informasi guru. Nama guru akan tersedia sebagai pilihan di form jadwal.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nama" className="text-sm font-semibold">Nama Lengkap <span className="text-destructive">*</span></Label>
                <Input id="nama" placeholder="Contoh: Budi Santoso, S.Pd" {...register("nama")} />
                <FieldError message={errors.nama?.message} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nip" className="text-sm font-semibold">NIP <span className="text-muted-foreground font-normal">(opsional)</span></Label>
                <Input id="nip" placeholder="Contoh: 19850101 201001 1 001" {...register("nip")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="jabatan" className="text-sm font-semibold">Jabatan / Mata Pelajaran Ampuan <span className="text-muted-foreground font-normal">(opsional)</span></Label>
                <Input id="jabatan" placeholder="Contoh: Guru Matematika, Wali Kelas VIII-A" {...register("jabatan")} />
              </div>
            </div>

            <div className="shrink-0 border-t px-6 py-4 flex items-center justify-end gap-2 bg-muted/30">
              <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setSelectedItem(null); }} disabled={isSubmitting}>Batal</Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isEditing ? "Simpan Perubahan" : "Tambah Guru"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
