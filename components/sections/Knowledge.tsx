"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon, { IconName } from "@/components/primitives/Icons";

type Article = { i: IconName; tag: string; title: string; read: string };

const articles: Article[] = [
  { i: "depression", tag: "Depression", title: "When sadness becomes a clinical concern", read: "5 min read" },
  { i: "anxiety", tag: "Anxiety", title: "Panic attacks: what is actually happening", read: "6 min read" },
  { i: "sleep", tag: "Sleep", title: "Sleep hygiene that does not feel like work", read: "4 min read" },
  { i: "addiction", tag: "Addiction", title: "Early signs of substance dependence", read: "7 min read" },
  { i: "brain", tag: "Brain Health", title: "Habits that quietly protect cognition", read: "5 min read" },
  { i: "leaf", tag: "Healthy Ageing", title: "Mental wellness through the decades", read: "6 min read" },
  { i: "shield", tag: "Preventive Psychiatry", title: "Why prevention matters in mental health", read: "5 min read" }
];

export default function Knowledge() {
  return (
    <section id="knowledge" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeading
            eyebrow="Knowledge & Resources"
            title="Calmly written. Clinically grounded."
            description="Short, accessible reads on mental health, longevity and modern psychiatry."
          />
          <a href="#contact" className="btn">
            Request a topic <Icon name="arrow" />
          </a>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {articles.map((a, i) => (
            <motion.a
              key={a.title}
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.05 }}
              whileHover={{ y: -4 }}
              className="group glass glass-shine rounded-2xl p-6 block"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
                <span className="text-teal-400"><Icon name={a.i} /></span>
                {a.tag}
              </div>
              <h3 className="mt-4 text-[17px] leading-snug font-medium text-white group-hover:text-gradient-cool">
                {a.title}
              </h3>
              <div className="mt-6 flex items-center justify-between text-xs text-white/50">
                <span>{a.read}</span>
                <span className="inline-flex items-center gap-1 text-white/70 group-hover:text-white">
                  Read <Icon name="arrow" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
