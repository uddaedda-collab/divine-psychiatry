"use client";

import GlassPanel from "@/components/primitives/GlassPanel";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon from "@/components/primitives/Icons";
import { Capsule, RxBadge } from "@/components/primitives/MedicalDecor";
import { motion } from "framer-motion";

const areas = [
  { t: "Opioid dependence", d: "Stabilisation, pharmacotherapy and harm-reduction guidance." },
  { t: "Alcohol use disorder", d: "Detox supervision, relapse prevention, family work." },
  { t: "Tobacco dependence", d: "Behavioural plans, NRT and structured follow-up." },
  { t: "Relapse prevention", d: "Triggers mapped, routines rebuilt, support sustained." },
  { t: "Polydrug use", d: "Comprehensive assessment with co-occurring mental health care." }
];

export default function Addiction() {
  return (
    <section id="addiction" className="section relative overflow-hidden">
      <Capsule className="hidden md:block absolute top-16 left-[4%] animate-floatA" rotate={28} hue="teal" size={70} />
      <Capsule className="hidden md:block absolute bottom-20 right-[5%] animate-floatB" rotate={-18} hue="blue" size={60} />
      <RxBadge className="hidden lg:block absolute top-32 right-[8%] w-12 h-12 animate-floatC" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Addiction & Recovery"
              title="Recovery, with respect."
              description="Substance dependence affects individuals, families and communities. Early intervention and sustained support can transform lives."
            />
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="chip"><Icon name="shield" /> Confidential</span>
              <span className="chip"><Icon name="heart" /> Family-inclusive</span>
              <span className="chip"><Icon name="check" /> Evidence-Based</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-3.5">
            {areas.map((a, i) => (
              <GlassPanel
                key={a.t}
                from={i % 2 === 0 ? "right" : "left"}
                delay={i * 0.05}
                className="p-5 sm:p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl glass-faint flex items-center justify-center text-teal-400 shrink-0">
                  <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="text-white text-[15px] sm:text-base font-medium">{a.t}</h3>
                  <p className="text-sm text-white/60 mt-1.5 leading-relaxed">{a.d}</p>
                </div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="ml-auto self-center text-white/40 group-hover:text-white"
                >
                  <Icon name="arrow" />
                </motion.div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
