"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import GlassPanel from "@/components/primitives/GlassPanel";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon from "@/components/primitives/Icons";
import { PulseLine, StethoArc, CrossPlus } from "@/components/primitives/MedicalDecor";
import { doctorImages } from "@/lib/images";

const interests = [
  { i: "brain", t: "General Psychiatry" },
  { i: "heart", t: "Community Psychiatry" },
  { i: "shield", t: "Addiction Recovery" },
  { i: "leaf", t: "Healthy Ageing" },
  { i: "sparkle", t: "Preventive Mental Health" },
  { i: "globe", t: "Global Mental Health Access" }
] as const;

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  return (
    <section id="about" ref={ref} className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title="Quiet expertise. Modern psychiatry."
          description="A clinical practice rooted in listening, careful diagnosis and treatment that respects each person's story."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Doctor visual */}
          <div className="lg:col-span-5 relative">
            {/* Soft stethoscope decoration above frame */}
            <StethoArc className="hidden md:block absolute -top-10 -right-4 w-32 h-20 text-teal-400/40" />
            <CrossPlus className="hidden md:block absolute -top-2 right-28 w-4 h-4 text-teal-400 animate-glowSoft" />
            <motion.div
              style={{ y }}
              className="relative aspect-[3/4] rounded-[28px] overflow-hidden glass glass-shine"
            >
              {/* solid dark backdrop so portrait fits without cropping */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink-900 to-ink-800" />
              <img
                src={doctorImages.primary}
                alt="Dr. Sandeep Sharma — Consultant Psychiatrist"
                loading="lazy"
                decoding="async"
                className="relative z-[1] w-full h-full object-contain"
              />
              <div
                aria-hidden
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(4,7,13,0) 60%, rgba(4,7,13,0.55) 100%), radial-gradient(60% 40% at 80% 0%, rgba(62,224,196,0.18), transparent 70%)"
                }}
              />
              <div className="absolute z-[3] bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="glass-faint rounded-full px-3 py-1.5 text-xs text-white/85">
                  Consultant Psychiatrist
                </div>
                <div className="glass-faint rounded-full px-3 py-1.5 text-xs text-white/85">
                  MD · Psychiatry
                </div>
              </div>
            </motion.div>

            {/* Floating signature card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.2,0.7,0.2,1] }}
              className="hidden xl:flex absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 items-center gap-3 max-w-[260px] z-10"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-brand-500 flex items-center justify-center text-ink-950">
                <Icon name="sparkle" />
              </div>
              <div>
                <div className="text-sm">Compassionate Care</div>
                <div className="text-[11px] text-white/55">Trusted Guidance · Mental Wellness</div>
              </div>
            </motion.div>
          </div>

          {/* Glass info */}
          <div className="lg:col-span-7">
            <GlassPanel from="right" strong className="p-7 sm:p-9">
              <div className="eyebrow">Dr. Sandeep Sharma</div>
              <h3 className="h3 mt-3 text-gradient">
                Evidence-based, compassionate and socially relevant mental healthcare.
              </h3>

              <PulseLine className="mt-5 h-6 opacity-70" />

              <p className="lead mt-5">
                Dr. Sandeep Sharma is a psychiatrist whose clinical work blends rigorous diagnosis
                with humane care. He focuses on community mental health, addiction awareness and
                preventive wellness, with growing interest in longevity and healthy ageing medicine.
              </p>

              <ul className="mt-7 grid sm:grid-cols-2 gap-2.5">
                {interests.map((it) => (
                  <li
                    key={it.t}
                    className="glass-faint rounded-xl px-3.5 py-3 flex items-center gap-3 text-sm text-white/85"
                  >
                    <span className="text-teal-400"><Icon name={it.i as any} /></span>
                    {it.t}
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { k: "Listening", v: "Patient-led" },
                  { k: "Diagnosis", v: "Evidence-Based" },
                  { k: "Follow-up", v: "Continuous" }
                ].map((m) => (
                  <div key={m.k} className="glass-faint rounded-xl p-3.5 text-center">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{m.k}</div>
                    <div className="mt-1 text-sm">{m.v}</div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
