"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed top-3 inset-x-0 z-50 px-3 sm:px-5"
    >
      <div
        className={`mx-auto max-w-6xl flex items-center justify-between gap-4 px-3 sm:px-4 py-2.5 rounded-full transition-all duration-500 ${
          scrolled ? "glass-strong" : "glass"
        }`}
      >
        <a href="#top" className="flex items-center pl-1.5">
          <Logo />
        </a>

        <nav className="hidden md:flex items-center gap-1 text-[13px] text-white/75">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/portal" className="hidden sm:inline-flex btn btn-ghost text-[12.5px] !py-2 !px-3.5">
            Portal
          </Link>
          <a href="#contact" className="btn btn-primary text-[12.5px] !py-2 !px-3.5">
            Book
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path d="M2 6h7m0 0L6 3m3 3L6 9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button
            aria-label="Open menu"
            className="md:hidden btn btn-ghost !py-2 !px-3"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-auto max-w-6xl mt-2 glass-strong rounded-3xl p-3"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link href="/portal" onClick={() => setOpen(false)} className="btn btn-ghost justify-center text-sm">Patient Portal</Link>
              <Link href="/portal" onClick={() => setOpen(false)} className="btn btn-ghost justify-center text-sm">Doctor Portal</Link>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-ghost justify-center text-sm">WhatsApp</a>
              <a href={site.phone} className="btn btn-primary justify-center text-sm">Call</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
