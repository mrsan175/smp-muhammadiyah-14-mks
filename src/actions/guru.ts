"use server";

import { db } from "@/lib/db";
import { guru } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

export type GuruRow = typeof guru.$inferSelect;

export async function getGuruAction(): Promise<GuruRow[]> {
  try {
    return await db.select().from(guru).where(eq(guru.isActive, true)).orderBy(asc(guru.nama));
  } catch (e) {
    console.error("Error fetching guru:", e);
    return [];
  }
}

export async function getAllGuruAction(): Promise<GuruRow[]> {
  try {
    return await db.select().from(guru).orderBy(asc(guru.nama));
  } catch (e) {
    console.error("Error fetching all guru:", e);
    return [];
  }
}

export async function createGuruAction(data: { nama: string; nip?: string; jabatan?: string; foto?: string }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.insert(guru).values({
      nama: data.nama,
      nip: data.nip ?? null,
      jabatan: data.jabatan ?? null,
      foto: data.foto ?? null,
    });
    revalidatePath("/profil/guru-staf");
    return { success: true };
  } catch (e) {
    console.error("Error creating guru:", e);
    return { error: "Gagal menambah guru" };
  }
}

export async function updateGuruAction(id: string, data: Partial<{ nama: string; nip: string; jabatan: string; foto: string; isActive: boolean }>) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.update(guru).set({ ...data, updatedAt: new Date() }).where(eq(guru.id, id));
    revalidatePath("/profil/guru-staf");
    return { success: true };
  } catch (e) {
    console.error("Error updating guru:", e);
    return { error: "Gagal mengubah data guru" };
  }
}

export async function deleteGuruAction(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.delete(guru).where(eq(guru.id, id));
    revalidatePath("/profil/guru-staf");
    return { success: true };
  } catch (e) {
    console.error("Error deleting guru:", e);
    return { error: "Gagal menghapus guru" };
  }
}
