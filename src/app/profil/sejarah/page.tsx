"use client";

import { motion } from "framer-motion";
import { History, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";

export default function SejarahPage() {
  const milestones = [
    { year: "1985", title: "Pendirian Sekolah", desc: "Berdiri di bawah naungan Pimpinan Cabang Muhammadiyah dengan fasilitas awal yang sederhana." },
    { year: "1998", title: "Akreditasi A", desc: "Berhasil meraih predikat Akreditasi A, mencerminkan kualitas pendidikan yang terus meningkat." },
    { year: "2010", title: "Pembangunan Gedung Baru", desc: "Peresmian gedung modern tiga lantai dengan fasilitas laboratorium dan perpustakaan lengkap." },
    { year: "2023", title: "Sekolah Adiwiyata", desc: "Meraih penghargaan Sekolah Adiwiyata tingkat Kota Makassar." }
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Profil Sekolah"
        title={<>Sejarah <span className="text-primary">Sekolah</span></>}
        description="Menelusuri perjalanan panjang dan inspiratif SMP Muhammadiyah 14 Makassar dari awal berdiri hingga saat ini."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-80 lg:h-full min-h-[400px] rounded-3xl overflow-hidden border shadow-sm"
          >
            <Image 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
              alt="Gedung Sekolah" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-white/90 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Makassar, Sulawesi Selatan</span>
              </div>
              <p className="text-white font-bold text-xl">Bangunan Ikonik Sejak 1985</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-foreground/80 leading-relaxed text-lg">
              SMP Muhammadiyah 14 Makassar didirikan atas semangat persyarikatan untuk menghadirkan layanan pendidikan berkualitas yang terjangkau bagi masyarakat. Semula kelas hanya menumpang di bangunan masjid terdekat.
            </p>
            <p className="text-foreground/80 leading-relaxed text-lg">
              Seiring berjalannya waktu, kepercayaan masyarakat semakin tumbuh. Berkat dukungan wali murid dan keuletan para pendidik, kini sekolah kami telah bertransformasi menjadi salah satu SMP unggulan di Makassar.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-border pl-6 md:pl-8 space-y-12 py-4">
          {milestones.map((item, i) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="relative"
            >
              <div className="absolute left-[-35px] md:left-[-43px] top-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-background">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <span className="text-primary font-black text-xl mb-1 block tracking-tight">{item.year}</span>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
