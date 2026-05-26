"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/SectionHeading";
import { doctorImages } from "@/lib/images";

type Card = { title: string; tag: string; img: string; copy: string };

const cards: Card[] = [
  {
    title: "Mental Health Camps",
    tag: "OPD Outreach",
    img: doctorImages.opdConsult,
    copy: "Free screening and counselling sessions in collaboration with local OPDs."
  },
  {
    title: "Awareness Programs",
    tag: "Public",
    img: doctorImages.ruralOpd,
    copy: "Community talks on stress, addiction and adolescent mental wellness."
  },
  {
    title: "School Sessions",
    tag: "Adolescents",
    img: doctorImages.signage,
    copy: "Conversations with students and educators on emotional resilience."
  },
  {
    title: "Rural Outreach",
    tag: "Sri Ganganagar",
    img: doctorImages.whiteCoat,
    copy: "Bringing psychiatric guidance to communities with limited access."
  },
  {
    title: "Public Talks",
    tag: "Wellness",
    img: doctorImages.primary,
    copy: "Evidence-based perspectives on sleep, longevity and modern living."
  }
];

export default function Outreach() {
  return (
    <section id="outreach" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Community Outreach"
          title="Care that travels beyond the clinic."
          description="Mental health is a community endeavour. These programs reflect a quiet commitment to access and awareness."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.figure
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.2,0.7,0.2,1] }}
              className="glass glass-shine rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* solid dark backdrop instead of duplicated blur (much cheaper) */}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink-900 to-ink-800" />
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  className="relative z-[1] w-full h-full object-contain"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 z-[2] pointer-events-none"
                  style={{ background: "linear-gradient(180deg, rgba(4,7,13,0) 65%, rgba(4,7,13,0.65) 100%)" }}
                />
                <div className="absolute z-[3] top-3 left-3 chip">{c.tag}</div>
              </div>
              <figcaption className="p-5">
                <h3 className="h3">{c.title}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">{c.copy}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
