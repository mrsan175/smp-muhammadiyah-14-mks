"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { hashPassword } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { registerSchema } from "@/lib/zod/zod-schemas";

const createUserSchema = registerSchema.extend({
    role: z.enum(["user", "teacher", "admin"]),
});

export async function createUserAction(prevState: any, formData: FormData) {
    try {
        // 1. Otorisasi - pastikan yang melakukan action adalah Admin
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== "admin") {
            return { error: "Akses Ditolak: Hanya admin yang dapat mendaftarkan user baru." };
        }

        const parsed = createUserSchema.safeParse(Object.fromEntries(formData));

        if (!parsed.success) {
            return { error: parsed.error.issues[0].message };
        }

        const { username, fullName, email, password, role } = parsed.data;

        // 2. Cek apakah username / email sudah terpakai
        const existingUsername = await db.query.users.findFirst({
            where: eq(users.username, username)
        });
        if (existingUsername) return { error: "Username sudah digunakan" };

        const existingEmail = await db.query.users.findFirst({
            where: eq(users.email, email)
        });
        if (existingEmail) return { error: "Email sudah digunakan" };

        // 3. Hash pass & Insert ke DB
        const hashedPassword = await hashPassword(password);

        await db.insert(users).values({
            username,
            fullName,
            email,
            password: hashedPassword,
            role,
            isActive: true,
        });

        revalidatePath("/dashboard/admin/users");
        return { success: `User ${username} berhasil dibuat` };

    } catch (e) {
        console.error("Create User Error:", e);
        return { error: "Terjadi kesalahan pada server" };
    }
}
