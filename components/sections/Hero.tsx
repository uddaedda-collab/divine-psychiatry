"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Particles from "@/components/primitives/Particles";
import Icon from "@/components/primitives/Icons";
import { site } from "@/lib/site";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", reduce ? "blur(0px)" : "blur(8px)"]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] pt-28 sm:pt-32 pb-16 overflow-hidden">
      {/* Cinematic backdrop */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px] rounded-full"
             style={{
               background:
                 "radial-gradient(closest-side, rgba(36,112,240,0.35), rgba(36,112,240,0) 70%)",
               filter: "blur(40px)"
             }}
        />
        <div className="absolute -bottom-40 -right-20 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full opacity-80"
             style={{
               background:
                 "radial-gradient(closest-side, rgba(62,224,196,0.28), rgba(62,224,196,0) 70%)",
               filter: "blur(40px)"
             }}
        />
        <Particles density={42} />
      </div>

      <motion.div style={{ y, opacity: fade, filter: blur }} className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <span className="chip">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            New patients welcomed · Sri Ganganagar
          </span>
        </motion.div>

        {/* Main glass panel */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
          className="relative mt-6 mx-auto glass-strong glass-shine rounded-[34px] p-7 sm:p-12 max-w-5xl"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="eyebrow justify-center inline-flex"
            >
              {site.tagline}
            </motion.p>

            <h1 className="h1 mt-6 text-gradient">
              Divine Psychiatry Clinic
              <span className="block mt-2 text-[0.55em] sm:text-[0.5em] tracking-tight font-medium text-white/70">
                by {site.doctor}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="lead mt-7 max-w-2xl mx-auto"
            >
              Compassionate, evidence-based psychiatric care with a vision toward mental wellness,
              preventive health and healthy longevity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
            >
              <a href="#contact" className="btn btn-primary">
                Book Appointment <Icon name="arrow" />
              </a>
              <a href="#global" className="btn">
                <Icon name="globe" /> Global Consultation
              </a>
              <a href="#contact" className="btn">
                <Icon name="pin" /> OPD Locations
              </a>
              <a href="#outreach" className="btn">
                <Icon name="sparkle" /> Outreach Programs
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener" className="btn">
                <Icon name="whatsapp" /> WhatsApp
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { k: "Evidence-Based", i: "shield" },
                { k: "Confidential", i: "check" },
                { k: "Compassionate", i: "heart" },
                { k: "Patient-First", i: "sparkle" }
              ].map((t) => (
                <div key={t.k} className="glass-faint rounded-2xl px-3 py-2.5 text-xs text-white/75 flex items-center gap-2 justify-center">
                  <span className="text-teal-400"><Icon name={t.i as any} /></span>
                  {t.k}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Floating mini-stats */}
        <div className="relative mt-7 grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {[
            { v: "5.0", l: "Patient Rating" },
            { v: "10+", l: "Years of Care" },
            { v: "9", l: "Areas of Practice" }
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.7, ease: [0.2,0.7,0.2,1] }}
              className="glass rounded-2xl p-4 sm:p-5 text-center"
            >
              <div className="font-display text-2xl sm:text-3xl text-gradient-cool">{s.v}</div>
              <div className="text-[11px] mt-1 uppercase tracking-[0.18em] text-white/55">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/45"
      >
        scroll
      </motion.div>
    </section>
  );
}
