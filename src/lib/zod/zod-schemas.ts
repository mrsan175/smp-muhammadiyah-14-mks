import { z } from "zod";

export const loginSchema = z.object({
    identifier: z.string().min(1, "Username atau Email wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    username: z.string().min(3, "Username minimal 3 karakter").regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter").regex(/[A-Z]/, "Password harus mengandung setidaknya satu huruf besar").regex(/[0-9]/, "Password harus mengandung setidaknya satu angka").regex(/[^A-Za-z0-9]/, "Password harus mengandung setidaknya satu karakter khusus"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const kegiatanSchema = z.object({
    judul: z.string().min(5, "Judul minimal 5 karakter"),
    ringkasan: z.string().min(10, "Ringkasan minimal 10 karakter"),
    konten: z.string().min(20, "Konten minimal 20 karakter"),
    kategori: z.enum(["Akademik", "Ekskul", "Sosial", "Agama", "Prestasi"], {
        message: "Kategori tidak valid",
    }),
    tanggal: z.string().or(z.date()), // Bisa string "YYYY-MM-DD" dari form atau object Date
    gambar: z.string().url("Format URL gambar tidak valid"),
    featured: z.boolean().default(false),
});

export type KegiatanInput = z.infer<typeof kegiatanSchema>;

export const pengumumanSchema = z.object({
    teks: z.string().min(5, "Teks pengumuman minimal 5 karakter"),
    href: z.string().min(1, "Link tujuan wajib diisi"),
    isActive: z.boolean().default(true),
});

export type PengumumanInput = z.infer<typeof pengumumanSchema>;
