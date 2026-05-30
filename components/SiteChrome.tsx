"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MedicineRain from "@/components/MedicineRain";

/**
 * Renders the marketing chrome (animated background, navbar, footer) only on
 * the public website. Portal routes (/portal/*) get a clean app canvas.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith("/portal");

  if (isPortal) {
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <MedicineRain />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
