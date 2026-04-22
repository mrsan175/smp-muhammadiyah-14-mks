"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <PageHeader
        badge="Hubungi Kami"
        title={<>Kontak <span className="text-primary">Kami</span></>}
        description="Silahkan hubungi kami melalui kontak di bawah ini atau kunjungi alamat kami secara langsung."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8 flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">Telepon & WhatsApp</h3>
                <p className="text-sm text-muted-foreground">+62 812 3456 7890</p>
                <p className="text-sm text-muted-foreground">(0411) 123456</p>
              </div>
              <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">Email Resmi</h3>
                <p className="text-sm text-muted-foreground">info@smpm14mks.sch.id</p>
                <p className="text-sm text-muted-foreground">humas@smpm14mks.sch.id</p>
              </div>
              <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 sm:col-span-2 flex items-start gap-4">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Jam Operasional</h3>
                  <p className="text-sm text-muted-foreground">Senin - Jumat: 07:00 - 15:30 WITA</p>
                  <p className="text-sm text-muted-foreground">Sabtu: Ekstrakurikuler (08:00 - 12:00 WITA)</p>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 flex items-start gap-4">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Alamat Lengkap</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Jl. Daeng Siraju No.58, Tamparang Keke, Kec. Mamajang, Kota Makassar, Sulawesi Selatan 90134
                </p>
              </div>
            </div>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="h-full min-h-[450px] w-full rounded-3xl overflow-hidden border shadow-sm relative bg-muted"
          >
            <iframe
              src="https://maps.google.com/maps?q=SMP%20Muhammadiyah%2014%20Makassar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
