"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Loader2, DoorOpen, MoreHorizontal, Pencil } from "lucide-react";

import { useAdminUIStore } from "@/lib/store";
import { getKelasAction, createKelasAction, updateKelasAction, deleteKelasAction } from "@/actions/kelas";
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

const TINGKAT = ["VII", "VIII", "IX"] as const;

const TINGKAT_COLORS: Record<string, string> = {
  VII:  "bg-blue-100 text-blue-700 border-blue-200",
  VIII: "bg-violet-100 text-violet-700 border-violet-200",
  IX:   "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const kelasSchema = z.object({
  nama:    z.string().min(2, "Nama kelas minimal 2 karakter"),
  tingkat: z.string().optional(),
});

type FormValues = z.infer<typeof kelasSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1.5">⚠ {message}</p>;
}

export default function KelasAdminPage() {
  const { data: kelasList, mutate, isLoading } = useSWR("kelas_admin", getKelasAction);
  const { isFormOpen, setFormOpen, selectedItem, setSelectedItem } = useAdminUIStore();

  const isEditing = !!selectedItem;
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(kelasSchema),
      defaultValues: { nama: "", tingkat: "" },
    });

  const handleOpenCreate = () => {
    setSelectedItem(null);
    reset({ nama: "", tingkat: "" });
    setFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setSelectedItem(item);
    reset({ nama: item.nama, tingkat: item.tingkat ?? "" });
    setFormOpen(true);
  };

  const onSubmit = async (values: FormValues) => {
    const result = isEditing
      ? await updateKelasAction(selectedItem.id, values)
      : await createKelasAction(values);

    if (result?.error) { toast.error(result.error); return; }
    toast.success(isEditing ? "Kelas diperbarui" : "Kelas ditambahkan");
    setFormOpen(false); setSelectedItem(null); mutate();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const result = await deleteKelasAction(deleteTarget);
    setIsDeleting(false);
    if (result?.error) { toast.error(result.error); return; }
    toast.success("Kelas dihapus");
    setDeleteTarget(null); mutate();
  };

  const perTingkat = (t: string) => kelasList?.filter((k) => k.tingkat === t).length ?? 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Hapus Kelas?"
        description="Kelas ini akan dihapus. Slot jadwal yang mengacu ke kelas ini tidak terpengaruh, namun nama kelas tidak akan muncul lagi di dropdown."
        confirmLabel="Ya, Hapus" isLoading={isDeleting} onConfirm={confirmDelete}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daftar Kelas</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Kelola nama kelas. Pilihan kelas ini akan tersedia saat menyusun jadwal pelajaran.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 shrink-0 shadow-sm">
          <Plus className="h-4 w-4" /> Tambah Kelas
        </Button>
      </div>

      {/* Stats */}
      <DashboardStatsGrid columns={4} stats={[
        { value: kelasList?.length ?? 0, label: "Total Kelas",  icon: DoorOpen, variant: "default" },
        { value: perTingkat("VII"),       label: "Kelas VII",    icon: DoorOpen, variant: "success" },
        { value: perTingkat("VIII"),      label: "Kelas VIII",   icon: DoorOpen, variant: "warning" },
        { value: perTingkat("IX"),        label: "Kelas IX",     icon: DoorOpen, variant: "muted" },
      ]} />

      {/* Table */}
      <Card className="shadow-sm border-border/60 p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="pl-5 font-semibold text-foreground">Nama Kelas</TableHead>
                <TableHead className="font-semibold text-foreground">Tingkat</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-5 w-[60px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-5"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))
              ) : !kelasList?.length ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-16 text-muted-foreground text-sm">
                    Belum ada kelas. Klik <strong>Tambah Kelas</strong> untuk memulai.
                  </TableCell>
                </TableRow>
              ) : (
                kelasList.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/20">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary text-xs">
                          {item.tingkat ?? item.nama.substring(0, 2)}
                        </div>
                        <span className="font-bold text-sm">Kelas {item.nama}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.tingkat ? (
                        <Badge variant="outline" className={`text-[10px] font-bold ${TINGKAT_COLORS[item.tingkat] ?? ""}`}>
                          Tingkat {item.tingkat}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground italic text-sm opacity-50">—</span>
                      )}
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
        <SheetContent side="right" className="w-full sm:max-w-sm flex flex-col p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle>{isEditing ? "Edit Kelas" : "Tambah Kelas"}</SheetTitle>
            <SheetDescription>Nama kelas ini akan tersedia sebagai pilihan di form jadwal pelajaran.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

              {/* Nama Kelas */}
              <div className="space-y-1.5">
                <Label htmlFor="nama" className="text-sm font-semibold">Nama Kelas <span className="text-destructive">*</span></Label>
                <Input id="nama" placeholder="Contoh: VII-A, VIII-B, IX-C" {...register("nama")} className="uppercase" />
                <p className="text-xs text-muted-foreground">Nama kelas akan otomatis diubah ke huruf kapital.</p>
                <FieldError message={errors.nama?.message} />
              </div>

              {/* Tingkat */}
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">Tingkat <span className="text-muted-foreground font-normal">(opsional)</span></Label>
                <div className="flex gap-2">
                  {TINGKAT.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setValue("tingkat", watch("tingkat") === t ? "" : t)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                        watch("tingkat") === t
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Digunakan untuk mengelompokkan dan mengurutkan kelas.</p>
              </div>
            </div>

            <div className="shrink-0 border-t px-6 py-4 flex items-center justify-end gap-2 bg-muted/30">
              <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setSelectedItem(null); }} disabled={isSubmitting}>Batal</Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isEditing ? "Simpan" : "Tambah Kelas"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
