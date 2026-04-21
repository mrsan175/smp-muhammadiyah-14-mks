"use client";

import { useState } from "react";
import { generateReactHelpers, generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";
import Image from "next/image";
import { ImageIcon, Loader2, X, CheckCircle2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const { startUpload, isUploading } = useUploadThing("kegiatanImageUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]?.ufsUrl) {
        onChange(res[0].ufsUrl);
      }
    },
    onUploadError: (error) => {
      alert(`Upload gagal: ${error.message}`);
    },
  });

  const handleFile = (file: File) => {
    if (file.size > 512 * 1024) {
      alert("Ukuran gambar melebihi batas 500KB. Kompres gambar terlebih dahulu.");
      return;
    }
    startUpload([file]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleRemove = () => onChange("");

  // ── Sudah ada gambar ─────────────────────────────────────────────────────────
  if (value) {
    return (
      <div className={cn("relative rounded-xl overflow-hidden border border-border/60 group", className)}>
        <div className="relative h-44 w-full">
          <Image src={value} alt="Preview" fill className="object-cover" sizes="600px" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
          <label className="cursor-pointer bg-white/90 text-foreground hover:bg-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow">
            <Upload className="h-3.5 w-3.5" /> Ganti Gambar
            <input type="file" accept="image/*" className="hidden" onChange={handleInputChange} disabled={isUploading} />
          </label>
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-500/90 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
          >
            <X className="h-3.5 w-3.5" /> Hapus
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-white text-xs font-medium truncate">{value.split("/").pop()}</span>
        </div>
      </div>
    );
  }

  // ── Drop zone ─────────────────────────────────────────────────────────────────
  return (
    <label
      className={cn(
        "relative flex flex-col items-center justify-center h-44 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-muted/30",
        isUploading && "pointer-events-none",
        className
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input type="file" accept="image/*" className="hidden" onChange={handleInputChange} disabled={isUploading} />

      {isUploading ? (
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Mengunggah gambar...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-muted-foreground px-4 text-center">
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            isDragging ? "bg-primary/10" : "bg-muted"
          )}>
            <ImageIcon className={cn("h-6 w-6", isDragging ? "text-primary" : "text-muted-foreground")} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {isDragging ? "Lepas untuk mengunggah" : "Klik atau seret gambar ke sini"}
            </p>
            <p className="text-xs mt-1">PNG, JPG, WEBP · <span className="font-semibold text-muted-foreground">Maks. 500KB</span></p>
          </div>
        </div>
      )}
    </label>
  );
}
