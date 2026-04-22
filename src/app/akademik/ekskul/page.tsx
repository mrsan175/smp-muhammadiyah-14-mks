"use client";

import { motion } from "framer-motion";
import { Activity, Music, Palette, Tent, Shield, Medal } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function EkskulPage() {
  const ekskulList = [
    { title: "Pramuka", icon: Tent, desc: "Kegiatan kepanduan wajib untuk menanamkan kedisiplinan dan kemandirian bersendikan ajaran Islam.", color: "text-amber-600", bg: "bg-amber-600/10" },
    { title: "Tapak Suci", icon: Shield, desc: "Perguruan seni beladiri Indonesia di bawah naungan Muhammadiyah untuk melatih fisik dan mental.", color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Hizbul Wathan (HW)", icon: Medal, desc: "Gerakan kepanduan khusus dalam Persyarikatan Muhammadiyah untuk membentuk generasi islami.", color: "text-green-600", bg: "bg-green-600/10" },
    { title: "Futsal", icon: Activity, desc: "Wadah penyaluran bakat olahraga bela diri fisik dan kerja sama tim antar siswa.", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Seni Baca Al-Qur'an", icon: Music, desc: "Pelatihan seni tilawah dan tartil untuk memperindah bacaan Al-Qur'an secara tartil.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Seni Rupa & Kriya", icon: Palette, desc: "Pengembangan kreativitas siswa dalam bidang menggambar, melukis, dan kreasi kerajinan.", color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Pengembangan Diri"
        title={<>Ekstra<span className="text-primary">kurikuler</span></>}
        description="Wadah pengembangan minat, bakat, dan kreativitas siswa di luar jam pelajaran sekolah."
      />
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ekskulList.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1) }}
              className="bg-card rounded-3xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/40 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <item.icon className="w-32 h-32 -mr-10 -mt-10 mb-4" />
              </div>
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${item.bg}`}>
                <item.icon className={`h-7 w-7 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
