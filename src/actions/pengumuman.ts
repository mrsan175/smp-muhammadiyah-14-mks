"use server";

import { db } from "@/lib/db";
import { pengumuman } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

export async function getPengumumanAction() {
    try {
        return await db.select().from(pengumuman).orderBy(desc(pengumuman.createdAt));
    } catch (e) {
        console.error("Error fetching pengumuman:", e);
        return [];
    }
}

export async function createPengumumanAction(data: { teks: string; href: string }) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Unauthorized" };
        }

        await db.insert(pengumuman).values({
            teks: data.teks,
            href: data.href,
        });

        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("Error creating pengumuman:", e);
        return { error: "Failed to create" };
    }
}

export async function togglePengumumanAction(id: string, currentStatus: boolean) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Unauthorized" };
        }

        await db.update(pengumuman)
            .set({ isActive: !currentStatus })
            .where(eq(pengumuman.id, id));
            
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("Error updating pengumuman:", e);
        return { error: "Failed to update" };
    }
}

export async function deletePengumumanAction(id: string) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Unauthorized" };
        }
        await db.delete(pengumuman).where(eq(pengumuman.id, id));
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("Error deleting pengumuman:", e);
        return { error: "Failed to delete" };
    }
}

export async function updatePengumumanAction(id: string, data: { teks: string; href: string }) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Unauthorized" };
        }
        await db.update(pengumuman).set({
            teks: data.teks,
            href: data.href,
            updatedAt: new Date(),
        }).where(eq(pengumuman.id, id));
        revalidatePath("/");
        return { success: true };
    } catch (e) {
        console.error("Error updating pengumuman:", e);
        return { error: "Failed to update" };
    }
}
