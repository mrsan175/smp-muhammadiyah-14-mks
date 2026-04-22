"use client";

import { motion } from "framer-motion";
import { Megaphone, CalendarIcon, FileText } from "lucide-react";
import useSWR from "swr";
import { getPengumumanAction } from "@/actions/pengumuman";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/page-header";

export default function PengumumanPage() {
  const { data: pengumuman, isLoading } = useSWR("pengumuman_public_page", () => getPengumumanAction());
  
  const activePengumuman = (pengumuman || []).filter(p => p.isActive);

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader 
        badge="Informasi PENTING"
        title={<>Pusat <span className="text-primary">Pengumuman</span></>}
        description="Dapatkan informasi dan pengumuman resmi terbaru langsung dari pihak sekolah."
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-12">

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border shadow-sm">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : activePengumuman.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-dashed">
            <Megaphone className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground">Kosong</h3>
            <p className="text-muted-foreground mt-2">Tidak ada pengumuman aktif saat ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activePengumuman.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
              >
                <Link
                  href={item.href}
                  className="block bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary/80 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Megaphone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {item.teks}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="h-3 w-3" />
                          <span>
                            {new Date(item.tanggal || new Date()).toLocaleDateString("id-ID", {
                              day: "numeric", month: "long", year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          <FileText className="h-3 w-3" /> Buka Tautan
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
