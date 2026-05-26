"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon, { IconName } from "@/components/primitives/Icons";
import { NeuronWeb, Capsule } from "@/components/primitives/MedicalDecor";

const topics: { i: IconName; t: string; d: string }[] = [
  { i: "brain", t: "Brain Health", d: "Cognitive vitality across decades." },
  { i: "compass", t: "Cognitive Ageing", d: "Memory, attention and resilience." },
  { i: "heart", t: "Emotional Resilience", d: "Stress, identity and meaning." },
  { i: "shield", t: "Preventive Health", d: "Risks identified early." },
  { i: "sleep", t: "Sleep Wellness", d: "Restorative rhythms restored." },
  { i: "leaf", t: "Lifestyle Psychiatry", d: "Behaviour as medicine." }
];

export default function Longevity() {
  return (
    <section id="longevity" className="section relative overflow-hidden">
      {/* Futuristic backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 40% at 80% 10%, rgba(62,224,196,0.18), transparent 60%), radial-gradient(50% 40% at 10% 80%, rgba(36,112,240,0.22), transparent 60%)"
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 w-[140%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(62,224,196,0.0), rgba(62,224,196,0.12), rgba(36,112,240,0.12), rgba(62,224,196,0.0))"
          }}
        />
        {/* Neuron web — calm brain motif */}
        <NeuronWeb className="absolute inset-x-0 top-1/3 mx-auto w-[120%] max-w-[1300px] opacity-[0.22]" />
        {/* corner capsules */}
        <Capsule className="hidden md:block absolute top-10 right-10 animate-floatA" rotate={18} hue="teal" size={70} />
        <Capsule className="hidden md:block absolute bottom-12 left-10 animate-floatC" rotate={-22} hue="blue" size={60} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Longevity & Healthy Ageing"
          title="Science of living better, longer."
          description="A growing area of professional interest. The mind ages with the body — and both respond to thoughtful, science-led care."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {topics.map((t, i) => (
            <motion.div
              key={t.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.85, delay: i * 0.05, ease: [0.2,0.7,0.2,1] }}
              className="relative glass glass-shine rounded-2xl p-6 overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl glass-faint flex items-center justify-center text-teal-400">
                  <Icon name={t.i} />
                </div>
                <div className="text-[10px] tracking-[0.22em] uppercase text-white/40">0{i + 1}</div>
              </div>
              <h3 className="h3 mt-5">{t.t}</h3>
              <p className="text-sm text-white/60 mt-2 leading-relaxed">{t.d}</p>

              <div
                aria-hidden
                className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full opacity-50 blur-2xl"
                style={{ background: "radial-gradient(closest-side, rgba(62,224,196,0.25), transparent 70%)" }}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/45 max-w-xl mx-auto">
          Note · This section reflects an evolving area of professional interest and scientific exploration,
          and is not a clinical claim of treatment outcomes.
        </p>
      </div>
    </section>
  );
}
