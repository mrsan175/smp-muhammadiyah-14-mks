"use server";

import { db } from "@/lib/db";
import { jadwal, mataPelajaran, guru, kelas as kelasTable } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

export type JadwalRow = typeof jadwal.$inferSelect;

// Joined type for public display
export type JadwalWithRelations = JadwalRow & {
  mapelNama: string | null;
  guruNama: string | null;
};

export type CreateJadwalData = {
  kelas: string;
  hari: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat";
  jamMulai: string;
  jamSelesai: string;
  urutan: number;
  mapelId?: string | null;
  guruId?: string | null;
  isIstirahat?: boolean;
  labelIstirahat?: string;
};

// Get jadwal for a class with joined mapel & guru names
export async function getJadwalByKelasAction(kelas: string): Promise<JadwalWithRelations[]> {
  try {
    const rows = await db
      .select({
        id: jadwal.id,
        kelas: jadwal.kelas,
        hari: jadwal.hari,
        jamMulai: jadwal.jamMulai,
        jamSelesai: jadwal.jamSelesai,
        urutan: jadwal.urutan,
        mapelId: jadwal.mapelId,
        guruId: jadwal.guruId,
        isIstirahat: jadwal.isIstirahat,
        labelIstirahat: jadwal.labelIstirahat,
        createdAt: jadwal.createdAt,
        updatedAt: jadwal.updatedAt,
        mapelNama: mataPelajaran.nama,
        guruNama: guru.nama,
      })
      .from(jadwal)
      .leftJoin(mataPelajaran, eq(jadwal.mapelId, mataPelajaran.id))
      .leftJoin(guru, eq(jadwal.guruId, guru.id))
      .where(eq(jadwal.kelas, kelas))
      .orderBy(asc(jadwal.hari), asc(jadwal.urutan));

    return rows as JadwalWithRelations[];
  } catch (e) {
    console.error("Error fetching jadwal:", e);
    return [];
  }
}

// Get all registered class names (from kelas table, sorted by tingkat + nama)
export async function getKelasListAction(): Promise<string[]> {
  try {
    const rows = await db
      .select({ nama: kelasTable.nama })
      .from(kelasTable)
      .orderBy(asc(kelasTable.tingkat), asc(kelasTable.nama));
    return rows.map((r) => r.nama);
  } catch (e) {
    console.error("Error fetching kelas list:", e);
    return [];
  }
}

// Get all jadwal with joined names (for admin table)
export async function getAllJadwalAction(): Promise<JadwalWithRelations[]> {
  try {
    const rows = await db
      .select({
        id: jadwal.id,
        kelas: jadwal.kelas,
        hari: jadwal.hari,
        jamMulai: jadwal.jamMulai,
        jamSelesai: jadwal.jamSelesai,
        urutan: jadwal.urutan,
        mapelId: jadwal.mapelId,
        guruId: jadwal.guruId,
        isIstirahat: jadwal.isIstirahat,
        labelIstirahat: jadwal.labelIstirahat,
        createdAt: jadwal.createdAt,
        updatedAt: jadwal.updatedAt,
        mapelNama: mataPelajaran.nama,
        guruNama: guru.nama,
      })
      .from(jadwal)
      .leftJoin(mataPelajaran, eq(jadwal.mapelId, mataPelajaran.id))
      .leftJoin(guru, eq(jadwal.guruId, guru.id))
      .orderBy(asc(jadwal.kelas), asc(jadwal.hari), asc(jadwal.urutan));

    return rows as JadwalWithRelations[];
  } catch (e) {
    console.error("Error fetching all jadwal:", e);
    return [];
  }
}

export async function createJadwalAction(data: CreateJadwalData) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.insert(jadwal).values({
      kelas: data.kelas,
      hari: data.hari,
      jamMulai: data.jamMulai,
      jamSelesai: data.jamSelesai,
      urutan: data.urutan,
      mapelId: data.mapelId ?? null,
      guruId: data.guruId ?? null,
      isIstirahat: data.isIstirahat ?? false,
      labelIstirahat: data.labelIstirahat ?? null,
    });
    revalidatePath("/akademik/jadwal");
    return { success: true };
  } catch (e) {
    console.error("Error creating jadwal:", e);
    return { error: "Gagal menyimpan jadwal" };
  }
}

export async function updateJadwalAction(id: string, data: Partial<CreateJadwalData>) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.update(jadwal).set({ ...data, updatedAt: new Date() }).where(eq(jadwal.id, id));
    revalidatePath("/akademik/jadwal");
    return { success: true };
  } catch (e) {
    console.error("Error updating jadwal:", e);
    return { error: "Gagal mengubah jadwal" };
  }
}

export async function deleteJadwalAction(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "admin") return { error: "Unauthorized" };
    await db.delete(jadwal).where(eq(jadwal.id, id));
    revalidatePath("/akademik/jadwal");
    return { success: true };
  } catch (e) {
    console.error("Error deleting jadwal:", e);
    return { error: "Gagal menghapus jadwal" };
  }
}
