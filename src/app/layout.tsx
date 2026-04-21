import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ScrollToTop } from "@/components/scroll-to-top";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnnouncementTicker } from "@/components/announcement-ticker";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SMP Muhammadiyah 14 Makassar – Sekolah Menengah Pertama Muhammadiyah",
    template: "%s | SMP Muhammadiyah 14 Makassar",
  },
  description:
    "Website resmi SMP Muhammadiyah 14 Makassar. Mencetak generasi berakhlak mulia, berprestasi, dan berjiwa Islami.",
  keywords: [
    "SMP Muhammadiyah 14 Makassar",
    "SMP Muhammadiyah Makassar",
    "sekolah Islam Makassar",
    "profil sekolah",
  ],
  openGraph: {
    title: "SMP Muhammadiyah 14 Makassar",
    description:
      "Website resmi SMP Muhammadiyah 14 Makassar – Sekolah berprestasi berjiwa Islami.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col relative">
        <TooltipProvider>
          <NextTopLoader
            color="oklch(0.50 0.17 162)"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px oklch(0.50 0.17 162),0 0 5px oklch(0.62 0.18 175)"
          />
          <AnnouncementTicker />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
          <ScrollToTop />
        </TooltipProvider>
      </body>
    </html>
  );
}
