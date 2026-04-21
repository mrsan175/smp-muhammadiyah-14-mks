import { db } from "./index";
import { users, pengumuman, kegiatan } from "./schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../auth";

async function main() {
    console.log("Seeding started...");

    let adminUser = await db.query.users.findFirst({
        where: eq(users.role, "admin")
    });

    if (!adminUser) {
        console.log("Creating Admin user...");
        const hashedPassword = await hashPassword("admin123!");
        [adminUser] = await db.insert(users).values({
            username: "admin",
            fullName: "Administrator",
            email: "admin@smpm14makassar.sch.id",
            password: hashedPassword,
            role: "admin",
            isActive: true,
        }).returning();
        console.log("Admin user seeded successfully!");
    } else {
        console.log("Admin user already exists. Proceeding with other seeds...");
    }

    const PENGUMUMAN_DATA = [
      {
        teks: "PPDB 2026/2027 resmi dibuka! Daftarkan putra-putri Anda sekarang.",
        href: "/ppdb",
      },
      {
        teks: "Selamat! Siswa SMP Muhammadiyah 14 Makassar raih Juara 1 Olimpiade Sains Kota Makassar 2026.",
        href: "/kegiatan",
      },
      {
        teks: "Jadwal Ujian Akhir Semester Genap TP. 2026/2027 telah diterbitkan. Cek di menu Akademik.",
        href: "/akademik/jadwal",
      }
    ];

    console.log("Seeding Pengumuman...");
    for (const p of PENGUMUMAN_DATA) {
        const existing = await db.query.pengumuman.findFirst({ where: eq(pengumuman.teks, p.teks) });
        if (!existing) {
             await db.insert(pengumuman).values(p);
        }
    }

    const KEGIATAN_DATA = [
      {
        slug: "pesantren-kilat-ramadan-1446-h",
        judul: "Pesantren Kilat Ramadan 1446 H",
        ringkasan: "Kegiatan rutin bulan suci Ramadan untuk meningkatkan iman dan taqwa siswa-siswi.",
        konten: "Selama tiga hari berturut-turut, siswa-siswi SMP Muhammadiyah 14 Makassar mengikuti Pesantren Kilat. Beragam materi dari Fiqih ibadah, tadarus Al-Quran, hingga pembinaan karakter disiplin diajarkan oleh para pemateri kompeten di bidangnya. Acara diakhiri dengan buka puasa bersama yang penuh kehangatan.",
        kategori: "Agama" as const,
        tanggal: new Date("2026-03-24"),
        gambar: "https://images.unsplash.com/photo-1596728036237-772bef2dd756?q=80&w=800&auto=format&fit=crop",
        penulisId: adminUser.id,
        featured: true
      },
      {
        slug: "pelatihan-jurnalistik-digital",
        judul: "Pelatihan Jurnalistik Digital 2026",
        ringkasan: "Membekali siswa dengan keterampilan menulis berita dan literasi digital di era modern.",
        konten: "Bekerja sama dengan praktisi media lokal, sekolah menyelenggarakan pelatihan jurnalistik digital bagi siswa perwakilan dari setiap kelas. Dalam pelatihan ini, siswa dilatih cara meliput peristiwa, menyusun artikel yang menarik, dan dasar-dasar kode etik jurnalistik di internet.",
        kategori: "Akademik" as const,
        tanggal: new Date("2026-02-15"),
        gambar: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=800&auto=format&fit=crop",
        penulisId: adminUser.id,
        featured: false
      },
      {
        slug: "aksi-tanam-pohon-bersama",
        judul: "Aksi Tanam Pohon Bersama Komunitas Peduli Lingkungan",
        ringkasan: "Wujud nyata kepedulian warga sekolah terhadap kelestarian lingkungan dan penghijauan.",
        konten: "Sebagai sekolah yang peduli pada isu-isu pelestarian bumi, SMP Muhammadiyah 14 berpartisipasi menanam 100 bibit mangrove di kawasan pesisir. Tidak hanya melibatkan para siswa, kegiatan ini juga disokong penuh oleh komite sekolah dan majelis guru. Semoga bumi kita lekas membaik!",
        kategori: "Sosial" as const,
        tanggal: new Date("2026-01-10"),
        gambar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
        penulisId: adminUser.id,
        featured: true
      }
    ];

    console.log("Seeding Kegiatan...");
    for (const k of KEGIATAN_DATA) {
        const existing = await db.query.kegiatan.findFirst({ where: eq(kegiatan.slug, k.slug) });
        if (!existing) {
             await db.insert(kegiatan).values(k);
        }
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
}

main().catch((err) => {
    console.error("Seeding failed:");
    console.error(err);
    process.exit(1);
});
