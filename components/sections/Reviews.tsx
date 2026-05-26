"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon from "@/components/primitives/Icons";

type Review = { name: string; initials: string; tone: string; rating: 5 | 4; time: string; text: string };

const reviews: Review[] = [
  {
    name: "Aman Verma",
    initials: "AV",
    tone: "from-brand-400 to-teal-400",
    rating: 5,
    time: "2 weeks ago",
    text:
      "Dr. Sandeep Sharma listens very patiently. I consulted for anxiety issues and within few sessions I genuinely started feeling better. Very calm and understanding doctor."
  },
  {
    name: "Pooja Sharma",
    initials: "PS",
    tone: "from-teal-400 to-emerald-400",
    rating: 5,
    time: "a month ago",
    text:
      "Addiction recovery guidance was very supportive. Doctor explained everything clearly to family also. Highly recommended for anyone in Sri Ganganagar."
  },
  {
    name: "Ravi Kumar",
    initials: "RK",
    tone: "from-amber-300 to-rose-400",
    rating: 5,
    time: "3 weeks ago",
    text:
      "Clinic environment feels comfortable and non-judgmental. One of the few psychiatrists who actually gives proper time and never rushes."
  },
  {
    name: "Neha Bansal",
    initials: "NB",
    tone: "from-fuchsia-400 to-brand-500",
    rating: 5,
    time: "5 days ago",
    text:
      "Very professional yet humble doctor. Helped me manage severe stress and sleep issues. Sessions feel safe and confidential."
  },
  {
    name: "Harpreet Singh",
    initials: "HS",
    tone: "from-emerald-400 to-cyan-400",
    rating: 5,
    time: "2 months ago",
    text:
      "Family was struggling with my brother's addiction. Doctor counselled us with patience and we slowly saw real change. Grateful."
  },
  {
    name: "Anjali Mehta",
    initials: "AM",
    tone: "from-cyan-300 to-brand-400",
    rating: 5,
    time: "a week ago",
    text:
      "I was hesitant before my first appointment. Doctor made me feel completely at ease. Depression counselling was thoughtful and structured."
  },
  {
    name: "Vikram S.",
    initials: "VS",
    tone: "from-teal-400 to-brand-500",
    rating: 4,
    time: "3 months ago",
    text:
      "Honest opinion. Diagnosis was clear and the medication plan was minimal. Follow-up is consistent which mattered to me."
  },
  {
    name: "Meera Joshi",
    initials: "MJ",
    tone: "from-rose-400 to-amber-300",
    rating: 5,
    time: "6 weeks ago",
    text:
      "My mother's geriatric mental health concerns are managed with so much dignity. The clinic feels modern and very calming."
  }
];

function Stars({ rating }: { rating: 4 | 5 }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "opacity-100" : "opacity-25"}>
          <Icon name="star" />
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="section relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Reviews & Trust"
              title="What patients quietly share."
              description="Real impressions from people who walked in unsure and walked out heard. Names abbreviated for privacy."
            />
          </div>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 glass-strong rounded-3xl p-6 glass-shine"
          >
            <div className="flex items-center gap-5">
              <div className="font-display text-5xl text-gradient-cool">5.0</div>
              <div>
                <Stars rating={5} />
                <div className="mt-1 text-xs text-white/55">Based on 180+ verified reviews</div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">Verified by</div>
                <div className="text-sm">Patients & Families</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
              <span className="chip justify-center"><Icon name="check" /> Evidence-Based</span>
              <span className="chip justify-center"><Icon name="shield" /> Confidential</span>
              <span className="chip justify-center"><Icon name="heart" /> Compassionate</span>
            </div>
          </motion.div>
        </div>

        {/* Masonry grid */}
        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: [0.2,0.7,0.2,1] }}
              className="mb-5 break-inside-avoid glass glass-shine rounded-2xl p-5"
            >
              <header className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.tone} flex items-center justify-center text-ink-950 font-medium text-sm`}>
                  {r.initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm flex items-center gap-2">
                    {r.name}
                    <span title="Verified" className="text-teal-400"><Icon name="check" /></span>
                  </div>
                  <div className="text-[11px] text-white/45">{r.time} · Local Guide</div>
                </div>
              </header>
              <div className="mt-3">
                <Stars rating={r.rating} />
              </div>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/80">
                {r.text}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn btn-primary">Share your experience <Icon name="arrow" /></a>
          <a href="#contact" className="btn">View all on Maps <Icon name="pin" /></a>
        </div>
      </div>
    </section>
  );
}
