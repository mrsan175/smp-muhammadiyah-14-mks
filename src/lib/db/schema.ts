import { timestamp, pgTable, text, boolean, pgEnum } from "drizzle-orm/pg-core"


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