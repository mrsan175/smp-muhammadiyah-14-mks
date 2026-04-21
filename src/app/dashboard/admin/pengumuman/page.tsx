"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus, Trash2, Loader2, Megaphone,
  CheckCircle2, XCircle, Link2, AlignLeft,
  ToggleRight, MoreHorizontal, Pencil,
} from "lucide-react";

import { useAdminUIStore } from "@/lib/store";
import {
  getPengumumanAction, createPengumumanAction,
  deletePengumumanAction, togglePengumumanAction, updatePengumumanAction,
} from "@/actions/pengumuman";
import { ConfirmDialog } from "@/components/confirm-dialog";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const pengumumanSchema = z.object({
  teks: z.string().min(5, "Teks pengumuman minimal 5 karakter"),
  href: z.string().min(1, "Link tujuan wajib diisi"),
});

type FormValues = z.infer<typeof pengumumanSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive mt-1.5">⚠ {message}</p>;
}

export default function PengumumanPage() {
  const { data: pengumuman, mutate, isLoading } = useSWR("pengumuman", () => getPengumumanAction());
  const { isFormOpen, setFormOpen, selectedItem, setSelectedItem } = useAdminUIStore();

  const isEditing = !!selectedItem;
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(pengumumanSchema),
    defaultValues: { teks: "", href: "/" },
  });

  useEffect(() => {
    if (selectedItem) {
      reset({ teks: selectedItem.teks, href: selectedItem.href });
    } else {
      reset({ teks: "", href: "/" });
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
      const res = await updatePengumumanAction(selectedItem.id, data);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Pengumuman berhasil diperbarui!");
    } else {
      const res = await createPengumumanAction(data);
      if (res.error) { toast.error(res.error); return; }
      toast.success("Pengumuman berhasil ditambahkan!");
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
    mutate(pengumuman?.filter((p) => p.id !== deleteTarget), false);
    const res = await deletePengumumanAction(deleteTarget);
    if (res.error) toast.error(res.error);
    else toast.success("Pengumuman berhasil dihapus.");
    mutate();
    setDeleteTarget(null);
    setIsDeleting(false);
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    mutate(pengumuman?.map((p) => p.id === id ? { ...p, isActive: !p.isActive } : p), false);
    const res = await togglePengumumanAction(id, currentStatus);
    if (res.error) toast.error(res.error);
    mutate();
  };

  const activeCount = pengumuman?.filter((p) => p.isActive).length ?? 0;
  const totalCount = pengumuman?.length ?? 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Hapus Pengumuman?"
        description="Pengumuman ini akan dihapus secara permanen dari website. Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, Hapus"
        isLoading={isDeleting}
        onConfirm={confirmDelete}
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Pengumuman</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Pengumuman aktif akan tampil di pita berjalan (ticker) bagian atas website.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2 shrink-0 shadow-sm">
          <Plus className="h-4 w-4" /> Tambah Pengumuman
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3 text-center shadow-sm">
          <p className="text-2xl font-black">{totalCount}</p>
          <p className="text-xs font-semibold text-muted-foreground mt-0.5">Total</p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center shadow-sm">
          <p className="text-2xl font-black text-emerald-700">{activeCount}</p>
          <p className="text-xs font-semibold text-emerald-600 mt-0.5">Aktif</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center shadow-sm">
          <p className="text-2xl font-black text-slate-500">{totalCount - activeCount}</p>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Nonaktif</p>
        </div>
      </div>

      {/* Table */}
      <Card className="shadow-sm border-border/60 p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-semibold text-foreground pl-5 w-[48%]">Teks Pengumuman</TableHead>
                <TableHead className="font-semibold text-foreground">Link Tujuan</TableHead>
                <TableHead className="font-semibold text-foreground text-center w-[130px]">Status</TableHead>
                <TableHead className="font-semibold text-foreground text-right pr-5 w-[70px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-5"><Skeleton className="h-4 w-full max-w-xs" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-center"><Skeleton className="h-6 w-20 rounded-full mx-auto" /></TableCell>
                    <TableCell className="text-right pr-5"><Skeleton className="h-8 w-8 rounded ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : !pengumuman?.length ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Megaphone className="h-10 w-10 opacity-30" />
                      <div>
                        <p className="font-medium">Belum ada pengumuman</p>
                        <p className="text-sm mt-1">Buat pengumuman pertama untuk ditampilkan di ticker website.</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                pengumuman.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-5 py-4 max-w-0">
                      <div className="flex items-start gap-2.5">
                        <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${item.isActive ? "bg-emerald-500" : "bg-slate-300"}`} />
                        <p className="text-sm font-medium text-foreground leading-snug break-words whitespace-normal">{item.teks}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[140px]">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border/50 max-w-full overflow-hidden">
                        <Link2 className="h-3 w-3 shrink-0" />
                        <span className="truncate">{item.href}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => handleToggle(item.id, item.isActive ?? false)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer
                          ${item.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                          }`}
                      >
                        {item.isActive
                          ? <><CheckCircle2 className="h-3.5 w-3.5" /> Aktif</>
                          : <><XCircle className="h-3.5 w-3.5" /> Nonaktif</>
                        }
                      </button>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 data-[state=open]:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleOpenEdit(item)}>
                            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                            Edit Pengumuman
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer"
                            onClick={() => handleToggle(item.id, item.isActive ?? false)}
                          >
                            {item.isActive
                              ? <><XCircle className="h-3.5 w-3.5 text-muted-foreground" /> Nonaktifkan</>
                              : <><CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" /> Aktifkan</>
                            }
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Hapus
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
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0">
          <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isEditing ? "bg-slate-100 border border-slate-300" : "bg-primary/10"}`}>
                {isEditing
                  ? <Pencil className="h-4 w-4 text-slate-600" />
                  : <Megaphone className="h-4 w-4 text-primary" />
                }
              </div>
              <div>
                <SheetTitle className="text-base font-bold leading-none">
                  {isEditing ? "Edit Pengumuman" : "Tambah Pengumuman"}
                </SheetTitle>
                <SheetDescription className="text-xs mt-1">
                  {isEditing
                    ? "Perubahan akan langsung diterapkan ke website"
                    : "Pengumuman baru akan otomatis aktif dan tampil di ticker"
                  }
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              {!isEditing && (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-2">Preview di ticker</p>
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Megaphone className="h-4 w-4 text-primary shrink-0" />
                    <span className="italic opacity-60">Teks pengumuman Anda akan tampil seperti ini...</span>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-1.5">
                <Label htmlFor="teks" className="flex items-center gap-2 text-sm font-semibold">
                  <AlignLeft className="h-3.5 w-3.5 text-muted-foreground" /> Isi Pengumuman
                </Label>
                <Input
                  id="teks" autoComplete="off" className="h-11"
                  placeholder="Contoh: PPDB 2026/2027 resmi dibuka!"
                  {...register("teks")}
                />
                <FieldError message={errors.teks?.message} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="href" className="flex items-center gap-2 text-sm font-semibold">
                  <Link2 className="h-3.5 w-3.5 text-muted-foreground" /> Link Tujuan
                </Label>
                <Input
                  id="href" autoComplete="off" className="h-11 font-mono text-sm"
                  placeholder="/ppdb"
                  {...register("href")}
                />
                <FieldError message={errors.href?.message} />
                <div className="bg-muted/50 rounded-lg p-3 space-y-1 border border-border/40">
                  <p className="text-xs font-semibold text-muted-foreground">Contoh URL:</p>
                  <div className="grid grid-cols-2 text-xs gap-1 text-muted-foreground font-mono">
                    <span className="bg-background px-1.5 py-0.5 rounded border">/ppdb</span>
                    <span className="bg-background px-1.5 py-0.5 rounded border">/kegiatan</span>
                    <span className="bg-background px-1.5 py-0.5 rounded border col-span-2">https://wa.me/...</span>
                  </div>
                </div>
              </div>

              {!isEditing && (
                <div className="flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3">
                  <ToggleRight className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Pengumuman baru akan otomatis <strong>Aktif</strong>. Anda dapat menonaktifkannya dari menu Aksi di tabel.
                  </p>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t px-6 py-4 flex items-center justify-between bg-muted/30">
              <p className="text-xs text-muted-foreground">
                {isEditing ? "Perubahan langsung diterapkan" : "Aktif otomatis setelah disimpan"}
              </p>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setSelectedItem(null); }} disabled={isSubmitting}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting} className={`min-w-[140px] ${isEditing ? "bg-slate-800 hover:bg-slate-700 text-white" : ""}`}>
                  {isSubmitting
                    ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Menyimpan...</>
                    : isEditing ? "Simpan Perubahan" : "Simpan Pengumuman"
                  }
                </Button>
              </div>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
