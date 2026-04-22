import { timestamp, pgTable, text, boolean, pgEnum, integer } from "drizzle-orm/pg-core"


export const roleEnum = pgEnum("role", ["user", "teacher", "admin"])

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    fullName: text("fullName"),
    username: text("username").unique(),
    email: text("email").unique(),
    nip: text("nip").unique(), // Nomor Induk Pegawai
    phone: text("phone"),      // Nomor telepon/WA
    password: text("password"),
    image: text("image"),
    isActive: boolean("isActive").default(true),
    role: roleEnum("role").default("user").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})


export const refreshTokens = pgTable("refresh_tokens", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    revoked: boolean("revoked").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Histori setiap kali user login — 1 baris baru per sesi login
export const loginSessions = pgTable("login_sessions", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    loginAt: timestamp("login_at", { mode: "date" }).defaultNow().notNull(),
    ip: text("ip"),
    location: text("location"),
    device: text("device"),
});

export const kategoriKegiatanEnum = pgEnum("kategori_kegiatan", ["Akademik", "Ekskul", "Sosial", "Agama", "Prestasi"])

export const kegiatan = pgTable("kegiatan", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").unique().notNull(),
    judul: text("judul").notNull(),
    ringkasan: text("ringkasan").notNull(),
    konten: text("konten").notNull(),
    tanggal: timestamp("tanggal", { mode: "date" }).notNull(),
    kategori: kategoriKegiatanEnum("kategori").notNull(),
    gambar: text("gambar").notNull(),
    penulisId: text("penulisId").notNull().references(() => users.id, { onDelete: "cascade" }),
    featured: boolean("featured").default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})

export const pengumuman = pgTable("pengumuman", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    teks: text("teks").notNull(),
    href: text("href").notNull(),
    tanggal: timestamp("tanggal", { mode: "date" }).defaultNow(),
    isActive: boolean("isActive").default(true),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})

// ─── Guru & Staf ─────────────────────────────────────────────────────────────

export const guru = pgTable("guru", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    nama: text("nama").notNull(),
    nip: text("nip"),
    jabatan: text("jabatan"),       // e.g. "Guru Matematika", "Wali Kelas VII-A"
    foto: text("foto"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})

// ─── Mata Pelajaran ───────────────────────────────────────────────────────────

export const mataPelajaran = pgTable("mata_pelajaran", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    nama: text("nama").notNull(),          // e.g. "Matematika"
    kode: text("kode"),                    // e.g. "MTK" (opsional)
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})

// ─── Kelas ───────────────────────────────────────────────────────────────────

export const kelas = pgTable("kelas", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    nama: text("nama").notNull().unique(), // e.g. "VII-A", "VIII-B", "IX-C"
    tingkat: text("tingkat"),              // e.g. "VII", "VIII", "IX"
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})

// ─── Jadwal Pelajaran ─────────────────────────────────────────────────────────
// Satu baris = satu slot pelajaran (kelas + hari + jam + mapel)

export const hariEnum = pgEnum("hari", ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"])

export const jadwal = pgTable("jadwal", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    kelas: text("kelas").notNull(),
    hari: hariEnum("hari").notNull(),
    jamMulai: text("jam_mulai").notNull(),
    jamSelesai: text("jam_selesai").notNull(),
    urutan: integer("urutan").notNull(),
    mapelId: text("mapel_id").references(() => mataPelajaran.id, { onDelete: "set null" }),
    guruId: text("guru_id").references(() => guru.id, { onDelete: "set null" }),
    isIstirahat: boolean("is_istirahat").default(false),
    labelIstirahat: text("label_istirahat"),  // custom label untuk baris istirahat
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})