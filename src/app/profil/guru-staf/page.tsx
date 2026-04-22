"use client";

import { motion } from "framer-motion";
import { User, Users, BookOpen, GraduationCap } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";

export default function GuruStafPage() {
  const staffList = [
    { role: "Kepala Sekolah", name: "Drs. H. Ahmad Dahlan, M.Pd.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
    { role: "Wakil Kepala Sekolah Bidang Kurikulum", name: "Ibu Siti Aminah, S.Pd., M.Si.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { role: "Wakil Kepala Sekolah Bidang Kesiswaan", name: "Bapak Budi Santoso, S.Pd.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
    { role: "Guru Matematika", name: "Bapak Ridwan", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
    { role: "Guru Bahasa Inggris", name: "Ibu Nurmala", img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80" },
    { role: "Guru Pendidikan Agama Islam", name: "K.H. Hasan Basri", img: "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Profil Sekolah"
        title={<>Guru & <span className="text-primary">Staf</span></>}
        description="Mengenal lebih dekat para pendidik dan tenaga kependidikan berdedikasi tinggi di SMP Muhammadiyah 14 Makassar."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-stretch sm:items-center justify-center gap-4 sm:gap-6">
          {staffList.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              className="w-full sm:w-52 bg-card rounded-2xl overflow-hidden border shadow-sm group hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-muted shrink-0">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  unoptimized
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-1.5 leading-tight">{item.name}</h3>
                <p className="text-[10px] sm:text-xs font-bold text-primary bg-primary/10 inline-block px-2 py-0.5 rounded-full">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
