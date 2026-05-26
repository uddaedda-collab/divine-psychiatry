"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon, { IconName } from "@/components/primitives/Icons";

const services: { i: IconName; t: string; d: string }[] = [
  { i: "depression", t: "Depression", d: "Sustained low mood, fatigue and loss of interest treated with care and tested protocols." },
  { i: "anxiety", t: "Anxiety", d: "Generalised anxiety, panic and social anxiety. Therapy and medication, only when needed." },
  { i: "ocd", t: "OCD", d: "Obsessive thoughts and compulsions. Structured exposure and pharmacology that fits real life." },
  { i: "bipolar", t: "Bipolar Disorder", d: "Mood stabilisation, relapse prevention and family-aware long-term planning." },
  { i: "sleep", t: "Sleep Disorders", d: "Insomnia, disrupted rhythms, restorative sleep restored without dependency." },
  { i: "child", t: "Child Psychiatry", d: "Attention, behaviour and developmental concerns assessed gently and accurately." },
  { i: "addiction", t: "Addiction Recovery", d: "From early intervention to relapse prevention. Confidential, family-inclusive." },
  { i: "counsel", t: "Counselling", d: "Talk-based support for life transitions, grief, stress and relationships." },
  { i: "geriatric", t: "Geriatric Psychiatry", d: "Memory, mood and behavioural care for older adults — with dignity." }
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Areas of Care"
          title="A complete spectrum of psychiatric care."
          description="Each concern is treated with attention to context. Diagnosis is careful. Treatment is collaborative."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s, i) => (
            <motion.article
              key={s.t}
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.2,0.7,0.2,1] }}
              whileHover={{ y: -4 }}
              className="group relative glass glass-shine rounded-2xl p-6 transition-shadow hover:shadow-[0_30px_70px_-30px_rgba(36,112,240,0.45)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl glass-faint flex items-center justify-center text-teal-400 group-hover:text-white transition-colors">
                  <Icon name={s.i} />
                </div>
                <h3 className="h3 text-white">{s.t}</h3>
              </div>
              <p className="mt-4 text-sm text-white/65 leading-relaxed">{s.d}</p>

              <div className="mt-5 flex items-center gap-2 text-xs text-white/55 group-hover:text-white transition">
                <span>Learn more</span>
                <Icon name="arrow" />
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "radial-gradient(40% 60% at 30% 0%, rgba(62,224,196,0.18), transparent 60%), radial-gradient(40% 60% at 70% 100%, rgba(36,112,240,0.18), transparent 60%)",
                  mixBlendMode: "screen"
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
