"use server";

import { db } from "@/lib/db";
import { users, loginSessions } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import {
    verifyPassword,
    createAndStoreRefreshToken,
    signAccessToken,
    setAuthCookies,
    clearAuthCookies
} from "@/lib/auth";
import { redirect } from "next/navigation";

import { loginSchema } from "@/lib/zod/zod-schemas";
export async function loginAction(prevState: any, formData: FormData) {
    try {
        const parsed = loginSchema.safeParse(Object.fromEntries(formData));

        if (!parsed.success) {
            return { error: parsed.error.issues[0].message };
        }

        const { identifier, password } = parsed.data;

        // Auto-seed admin if no users exist
        const anyUser = await db.query.users.findFirst();
        if (!anyUser) {
            const { hashPassword } = await import("@/lib/auth");
            const hashedPassword = await hashPassword("admin123");
            await db.insert(users).values({
                username: "admin",
                fullName: "Administrator",
                email: "smpmuhammadiyah14@yahoo.com",
                password: hashedPassword,
                role: "admin",
                isActive: true,
            });
            console.log("Auto-seeded admin user. username: admin, pass: admin123");
        }

        const user = await db.query.users.findFirst({
            where: or(eq(users.username, identifier), eq(users.email, identifier)),
        });

        if (!user || !user.password) {
            return { error: "Kredensial tidak valid" };
        }

        if (!user.isActive) {
            return { error: "Akun Anda dinonaktifkan" };
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
            return { error: "Kredensial tidak valid" };
        }

        const refresh = await createAndStoreRefreshToken(user.id);
        const access = await signAccessToken(user.id, user.role);

        await setAuthCookies(access, refresh.token, refresh.expiresAt);

        // --- Record Login Session ---
        const { headers } = await import("next/headers");
        const headersList = await headers();

        const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || null;
        const device = headersList.get("user-agent") || null;
        const location = headersList.get("x-vercel-ip-city") || headersList.get("x-vercel-ip-country") || null;

        await db.insert(loginSessions).values({
            userId: user.id,
            loginAt: new Date(),
            ip,
            device,
            location,
        });

    } catch (e) {
        console.error("Login error", e);
        return { error: "Terjadi kesalahan internal" };
    }

    // Redirect di luar catch block agar tidak tertangkap sebagai error
    redirect("/dashboard/admin"); // Ubah redirect sesuai role nanti misal /dashboard/teacher
}

export async function logoutAction() {
    await clearAuthCookies();
    redirect("/login");
}
