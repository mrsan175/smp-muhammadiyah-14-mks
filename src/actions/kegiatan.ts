"use server";

import { db } from "@/lib/db";
import { kegiatan } from "@/lib/db/schema";
import { eq, desc, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

export async function getKegiatanAction() {
    try {
        return await db.select().from(kegiatan).orderBy(desc(kegiatan.tanggal));
    } catch (e) {
        console.error("Error fetching kegiatan:", e);
        return [];
    }
}

export async function getKegiatanBySlugAction(slug: string) {
    try {
        const result = await db.select().from(kegiatan).where(eq(kegiatan.slug, slug)).limit(1);
        return result[0] ?? null;
    } catch (e) {
        console.error("Error fetching kegiatan by slug:", e);
        return null;
    }
}

export async function getRelatedKegiatanAction(currentSlug: string, limit = 3) {
    try {
        return await db
            .select()
            .from(kegiatan)
            .where(ne(kegiatan.slug, currentSlug))
            .orderBy(desc(kegiatan.tanggal))
            .limit(limit);
    } catch (e) {
        console.error("Error fetching related kegiatan:", e);
        return [];
    }
}

export async function createKegiatanAction(data: {
    judul: string;
    ringkasan: string;
    konten: string;
    kategori: "Akademik" | "Ekskul" | "Sosial" | "Agama" | "Prestasi";
    tanggal: string;
    gambar: string;
}) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Unauthorized" };
        }

        const slug = data.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        await db.insert(kegiatan).values({
            slug,
            judul: data.judul,
            ringkasan: data.ringkasan,
            konten: data.konten,
            kategori: data.kategori,
            tanggal: new Date(data.tanggal),
            gambar: data.gambar,
            penulisId: currentUser.id,
            featured: false
        });

        revalidatePath("/kegiatan");
        return { success: true };
    } catch (e) {
        console.error("Error creating kegiatan:", e);
        return { error: "Failed to create" };
    }
}

export async function deleteKegiatanAction(id: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Unauthorized" };
        }
        await db.delete(kegiatan).where(eq(kegiatan.id, id));
        revalidatePath("/kegiatan");
        return { success: true };
    } catch (e) {
        console.error("Error deleting kegiatan:", e);
        return { error: "Failed to delete" };
    }
}

export async function updateKegiatanAction(id: string, data: {
    judul: string;
    ringkasan: string;
    konten: string;
    kategori: "Akademik" | "Ekskul" | "Sosial" | "Agama" | "Prestasi";
    tanggal: string;
    gambar: string;
}) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Unauthorized" };
        }

        const slug = data.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        await db.update(kegiatan).set({
            slug,
            judul: data.judul,
            ringkasan: data.ringkasan,
            konten: data.konten,
            kategori: data.kategori,
            tanggal: new Date(data.tanggal),
            gambar: data.gambar,
            updatedAt: new Date(),
        }).where(eq(kegiatan.id, id));

        revalidatePath("/kegiatan");
        return { success: true };
    } catch (e) {
        console.error("Error updating kegiatan:", e);
        return { error: "Failed to update" };
    }
}

