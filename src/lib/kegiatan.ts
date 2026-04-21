// ─── Tipe Data ────────────────────────────────────────────────────────────────

export type Kegiatan = {
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string; // ISO date string
  kategori: "Akademik" | "Ekskul" | "Sosial" | "Agama" | "Prestasi";
  gambar: string; // Unsplash URL
  penulis: string;
  featured?: boolean;
};

// ─── Data Kegiatan ────────────────────────────────────────────────────────────

export const dataKegiatan: Kegiatan[] = [
  {
    slug: "lomba-sains-tingkat-kota",
    judul: "Siswa SMP Muhammadiyah 14 Makassar Raih Juara 1 Lomba Sains Tingkat Kota Makassar",
    ringkasan:
      "Tiga siswa unggulan kami berhasil meraih posisi teratas dalam Olimpiade Sains Kota Makassar 2025, membuktikan kualitas pembelajaran sains di sekolah kami.",
    konten: `Tim sains  kembali mengharumkan nama sekolah dengan meraih Juara 1 pada Olimpiade Sains Kota Makassar 2025 yang diselenggarakan oleh Dinas Pendidikan Kota Makassar.

Ketiga siswa yang mewakili sekolah, yaitu Muhammad Rizal (kelas IX-A), Nurul Hidayah (kelas VIII-B), dan Ahmad Fauzi (kelas IX-C), telah mempersiapkan diri selama 3 bulan di bawah bimbingan guru-guru berdedikasi.

"Alhamdulillah, kerja keras siswa-siswa kami membuahkan hasil yang luar biasa. Ini adalah bukti nyata bahwa kualitas pendidikan sains di SMP Muhammadiyah 14 Makassar terus meningkat," ujar Kepala Sekolah.

Tim akan melanjutkan ke tahap Olimpiade Sains Provinsi Sulawesi Selatan yang akan diselenggarakan bulan depan.`,
    tanggal: "2025-04-15",
    kategori: "Prestasi",
    gambar:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
    penulis: "Tim Humas SMP Muhammadiyah 14 Makassar",
    featured: true,
  },
  {
    slug: "pesantren-kilat-ramadan",
    judul: "Pesantren Kilat Ramadan 1446 H: Mempererat Ukhuwah Islamiyah",
    ringkasan:
      "Seluruh siswa SMP Muhammadiyah 14 Makassar mengikuti kegiatan pesantren kilat selama 5 hari penuh dalam rangka menyambut bulan suci Ramadan dengan semangat kebersamaan.",
    konten: ` kembali menggelar Pesantren Kilat Ramadan 1446 H selama 5 hari (20-24 Maret 2025) yang diikuti oleh seluruh siswa kelas VII, VIII, dan IX.

Kegiatan ini mencakup berbagai program islami seperti tadarus Al-Qur'an, kajian hadis, shalat berjamaah, buka puasa bersama, dan berbagai lomba keislaman.

Ustaz Ahmad Mukhlis selaku pembimbing utama menyampaikan bahwa kegiatan ini bertujuan untuk memperkuat akhlak dan spiritual siswa sekaligus mempererat persaudaraan antar sesama.

Pesantren kilat tahun ini diakhiri dengan acara pengumuman pemenang lomba dan penyerahan sertifikat kepada seluruh peserta.`,
    tanggal: "2025-03-24",
    kategori: "Agama",
    gambar:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80",
    penulis: "Bagian Kesiswaan",
    featured: true,
  },
  {
    slug: "bakti-sosial-panti-asuhan",
    judul: "Bakti Sosial ke Panti Asuhan Al-Ikhlas: Berbagi Kebahagiaan",
    ringkasan:
      "Siswa SMP Muhammadiyah 14 Makassar bersama guru dan orang tua murid mengunjungi Panti Asuhan Al-Ikhlas Makassar untuk berbagi sembako dan kebahagiaan bersama.",
    konten: `Dalam rangka menumbuhkan jiwa sosial dan empati siswa,  mengadakan kegiatan Bakti Sosial ke Panti Asuhan Al-Ikhlas Makassar pada Sabtu, 8 Maret 2025.

Kegiatan ini diikuti oleh 120 siswa perwakilan dari setiap kelas berserta 30 orang tua murid dan 15 orang guru. Bantuan yang diberikan meliputi paket sembako, perlengkapan sekolah, dan dana pendidikan bagi adik-adik di panti.

"Kegiatan ini mengajarkan anak-anak kami bahwa kebahagiaan sejati adalah ketika bisa berbagi dengan sesama," ujar Waka Kesiswaan, Bapak Hamdan, S.Pd.

Rencana ke depan, kegiatan bakti sosial akan dijadikan program rutin setiap triwulan sebagai bagian dari kurikulum pendidikan karakter sekolah.`,
    tanggal: "2025-03-08",
    kategori: "Sosial",
    gambar:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    penulis: "Tim Humas SMP Muhammadiyah 14 Makassar",
  },
  {
    slug: "pelatihan-robotik",
    judul: "Ekstrakurikuler Robotik Mulai Persiapkan Diri ke Kompetisi Nasional",
    ringkasan:
      "Kelompok Robotik SMP Muhammadiyah 14 Makassar mengikuti pelatihan intensif bersama mentor dari Universitas Hasanuddin untuk mempersiapkan diri ke kompetisi robotic nasional.",
    konten: `Ekstrakurikuler Robotik  kini tengah bersemangat mempersiapkan diri menghadapi Kompetisi Robotik Nasional Pelajar 2025.

Selama bulan Februari dan Maret 2025, tim yang terdiri dari 8 siswa pilihan mendapatkan pendampingan intensif dari dua mentor dari Jurusan Teknik Elektro Universitas Hasanuddin Makassar.

Materi pelatihan meliputi pemrograman Arduino, desain mekanik robot, dan strategi kompetisi. Setiap Sabtu, siswa berlatih selama 6 jam penuh di laboratorium komputer sekolah.

"Kami optimis tim kami bisa bersaing di level nasional. Anak-anak ini luar biasa dedikasi dan semangatnya," kata Pembina Ekskul Robotik, Bapak Irwan Syahid, ST.`,
    tanggal: "2025-02-20",
    kategori: "Ekskul",
    gambar:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80",
    penulis: "Pembina Ekskul",
  },
  {
    slug: "kunjungan-industri",
    judul: "Kunjungan Industri ke PT. Industri Kapal Indonesia: Belajar Langsung di Lapangan",
    ringkasan:
      "Siswa kelas IX SMP Muhammadiyah 14 Makassar melakukan kunjungan industri ke PT. IKI Makassar sebagai bagian dari program pembelajaran berbasis dunia nyata.",
    konten: `Sebanyak 180 siswa kelas IX  mengikuti kunjungan industri ke PT. Industri Kapal Indonesia (IKI) Makassar pada tanggal 10 Februari 2025.

Kunjungan ini merupakan bagian dari program pembelajaran berbasis proyek (Project-Based Learning) yang bertujuan memberikan pengalaman belajar secara langsung kepada siswa di lingkungan industri nyata.

Para siswa diperkenalkan dengan proses pembuatan kapal mulai dari desain, fabrikasi, hingga penyelesaian akhir. Mereka juga berkesempatan berbincang langsung dengan insinyur dan teknisi berpengalaman.

Kepala Program Studi menyampaikan bahwa kegiatan ini dirancang untuk memperluas wawasan siswa tentang dunia kerja dan mendorong mereka untuk memiliki cita-cita yang tinggi.`,
    tanggal: "2025-02-10",
    kategori: "Akademik",
    gambar:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    penulis: "Tim Humas SMP Muhammadiyah 14 Makassar",
  },
  {
    slug: "pentas-seni-smpm14",
    judul: "Pentas Seni & Budaya SMP Muhammadiyah 14 Makassar: Merayakan Kreativitas Siswa",
    ringkasan:
      "Ratusan siswa menampilkan bakat terbaik mereka dalam Pentas Seni Tahunan SMP Muhammadiyah 14 Makassar yang meriah dan penuh warna di Aula Sekolah.",
    konten: `Aula  dipenuhi antusias ratusan penonton pada saat berlangsungnya Pentas Seni & Budaya Tahunan pada 25 Januari 2025.

Acara yang bertajuk "Mekar Berkarya" ini menampilkan berbagai penampilan memukau dari siswa-siswi berbakat, mulai dari tari tradisional Sulawesi Selatan, paduan suara Islami, drama musikal, pameran lukisan dan kerajinan, hingga pertunjukan akustik.

Total ada 15 penampilan yang ditampilkan secara bergantian selama 5 jam penuh. Seluruh penonton, termasuk orang tua murid dan tamu undangan, sangat menikmati setiap penampilan.

"Kegiatan seperti ini sangat penting untuk mengembangkan kreativitas, kepercayaan diri, dan kecintaan terhadap budaya nasional," ujar Waka Kurikulum.`,
    tanggal: "2025-01-25",
    kategori: "Ekskul",
    gambar:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    penulis: "Panitia Pentas Seni",
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getKegiatanTerbaru(n: number = 3): Kegiatan[] {
  return [...dataKegiatan]
    .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
    .slice(0, n);
}

export function getKegiatanBySlug(slug: string): Kegiatan | undefined {
  return dataKegiatan.find((k) => k.slug === slug);
}

export const KATEGORI_COLOR: Record<Kegiatan["kategori"], string> = {
  Akademik: "oklch(0.50 0.17 162)",
  Ekskul: "oklch(0.62 0.18 175)",
  Sosial: "oklch(0.55 0.15 210)",
  Agama: "oklch(0.82 0.13 85)",
  Prestasi: "oklch(0.72 0.15 85)",
};
