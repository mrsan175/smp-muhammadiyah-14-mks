"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";

export default function GaleriPage() {
  const galleryItems = [
    { title: "Kegiatan Belajar Mengajar", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", colSpan: "md:col-span-2", rowSpan: "md:row-span-2" },
    { title: "Juara Lomba Futsal", img: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e", colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { title: "Ekstrakurikuler", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211", colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
    { title: "Pentas Seni Sekolah", img: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212", colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { title: "Kunjungan Industri", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Dokumentasi"
        title={<>Galeri <span className="text-primary">Sekolah</span></>}
        description="Dokumentasi momen-momen berharga dan aktivitas seru di lingkungan SMP Muhammadiyah 14 Makassar."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 grid-flow-dense">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${item.colSpan} ${item.rowSpan}`}
            >
              <Image 
                src={item.img} 
                alt={item.title} 
                fill 
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
