"use server";

import { db } from "@/lib/db";
import { mataPelajaran } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

export type MataPelajaranRow = typeof mataPelajaran.$inferSelect;

export async function getMataPelajaranAction(): Promise<MataPelajaranRow[]> {
  try {
    return await db.select().from(mataPelajaran).orderBy(asc(mataPelajaran.nama));
  } catch (e) {
    console.error("Error fetching mata pelajaran:", e);
    return [];
  }
}

export async function createMataPelajaranAction(data: { nama: string; kode?: string }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.insert(mataPelajaran).values({ nama: data.nama, kode: data.kode ?? null });
    revalidatePath("/akademik/mata-pelajaran");
    return { success: true };
  } catch (e) {
    console.error("Error creating mata pelajaran:", e);
    return { error: "Gagal menambah mata pelajaran" };
  }
}

export async function updateMataPelajaranAction(id: string, data: { nama: string; kode?: string }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.update(mataPelajaran).set({ nama: data.nama, kode: data.kode ?? null, updatedAt: new Date() }).where(eq(mataPelajaran.id, id));
    return { success: true };
  } catch (e) {
    console.error("Error updating mata pelajaran:", e);
    return { error: "Gagal mengubah mata pelajaran" };
  }
}

export async function deleteMataPelajaranAction(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.delete(mataPelajaran).where(eq(mataPelajaran.id, id));
    return { success: true };
  } catch (e) {
    console.error("Error deleting mata pelajaran:", e);
    return { error: "Gagal menghapus mata pelajaran" };
  }
}
