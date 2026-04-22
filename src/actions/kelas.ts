"use server";

import { db } from "@/lib/db";
import { kelas } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

export type KelasRow = typeof kelas.$inferSelect;

export async function getKelasAction(): Promise<KelasRow[]> {
  try {
    return await db.select().from(kelas).orderBy(asc(kelas.tingkat), asc(kelas.nama));
  } catch (e) {
    console.error("Error fetching kelas:", e);
    return [];
  }
}

export async function createKelasAction(data: { nama: string; tingkat?: string }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.insert(kelas).values({ nama: data.nama.toUpperCase(), tingkat: data.tingkat ?? null });
    revalidatePath("/akademik/jadwal");
    return { success: true };
  } catch (e: any) {
    if (e?.code === "23505") return { error: "Nama kelas sudah ada" };
    console.error("Error creating kelas:", e);
    return { error: "Gagal menambah kelas" };
  }
}

export async function updateKelasAction(id: string, data: { nama: string; tingkat?: string }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.update(kelas).set({ nama: data.nama.toUpperCase(), tingkat: data.tingkat ?? null, updatedAt: new Date() }).where(eq(kelas.id, id));
    revalidatePath("/akademik/jadwal");
    return { success: true };
  } catch (e: any) {
    if (e?.code === "23505") return { error: "Nama kelas sudah ada" };
    console.error("Error updating kelas:", e);
    return { error: "Gagal mengubah kelas" };
  }
}

export async function deleteKelasAction(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.delete(kelas).where(eq(kelas.id, id));
    revalidatePath("/akademik/jadwal");
    return { success: true };
  } catch (e) {
    console.error("Error deleting kelas:", e);
    return { error: "Gagal menghapus kelas" };
  }
}
