"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";

export default function StrukturPage() {
  const wakasek = [
    { role: "Wakil Kepala Bid. Kurikulum", name: "Dra. Hj. Aisyah", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" },
    { role: "Wakil Kepala Bid. Kesiswaan", name: "Budi Santoso, S.Pd", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a" },
    { role: "Wakil Kepala Bid. Sarpras", name: "Herman, M.Pd", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" },
    { role: "Wakil Kepala Bid. Humas", name: "Siti Aminah, S.Ag", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956" },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Profil Sekolah"
        title={<>Struktur <span className="text-primary">Organisasi</span></>}
        description="Sistem tata kelola dan manajemen manajerial di SMP Muhammadiyah 14 Makassar."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="flex flex-col items-center gap-6 relative">
          {/* Top Level */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 border-2 border-primary text-center px-8 py-6 rounded-3xl shadow-lg relative z-10 w-full max-w-sm"
          >
            <div className="relative h-24 w-24 rounded-full mx-auto mb-4 shadow-md border-4 border-white bg-muted overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt="Kepala Sekolah" fill unoptimized className="object-cover" />
            </div>
            <h3 className="font-bold text-foreground text-xl">Drs. H. Ahmad, M.Pd</h3>
            <p className="text-primary font-bold text-sm">Kepala Sekolah</p>
          </motion.div>

          {/* Lines */}
          <div className="h-8 w-1 bg-border rounded-full" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card border shadow-sm text-center px-6 py-4 rounded-2xl relative z-10 w-full max-w-xs flex flex-col items-center"
          >
            <div className="relative h-16 w-16 rounded-full mx-auto mb-3 border-2 border-border bg-muted overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="Ketua Komite Sekolah" fill unoptimized className="object-cover" />
            </div>
            <h3 className="font-bold text-foreground">Ir. Supriyadi</h3>
            <p className="text-muted-foreground text-sm">Ketua Komite Sekolah</p>
          </motion.div>

          <div className="h-8 w-1 bg-border rounded-full" />

          {/* Wakasek Level */}
          <div className="w-full relative">
            {/* Horizontal Line connecting Wakasek */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[75%] h-1 bg-border rounded-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
              {wakasek.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-card rounded-2xl p-6 border shadow-sm text-center relative flex flex-col items-center"
                >
                  <div className="hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-border" />
                  <div className="relative h-16 w-16 rounded-full mx-auto mb-3 border-2 border-border bg-muted overflow-hidden">
                    <Image src={item.img} alt={item.name} fill unoptimized className="object-cover" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium">{item.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
