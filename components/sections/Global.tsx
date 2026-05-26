"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon, { IconName } from "@/components/primitives/Icons";

const features: { i: IconName; t: string; d: string }[] = [
  { i: "globe", t: "Online Consultation", d: "Secure, scheduled video sessions for diaspora and remote patients." },
  { i: "compass", t: "International Enquiries", d: "Coordinated through the clinic for clinical clarity and continuity." },
  { i: "shield", t: "Secure Appointments", d: "Privacy-respecting platforms and clear consent flows." },
  { i: "check", t: "Follow-up Systems", d: "Structured plans with in-built reminders and review windows." },
  { i: "sparkle", t: "Time-zone Scheduling", d: "Slots arranged around your local hours with care." }
];

export default function Global() {
  return (
    <section id="global" className="section relative overflow-hidden">
      {/* World-map glow backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-90">
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-0 w-full h-full opacity-40"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3ee0c4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3ee0c4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="url(#g1)">
            {Array.from({ length: 220 }).map((_, i) => {
              const x = (i * 53) % 1200;
              const y = ((i * 37) % 600) + (Math.sin(i) + 1) * 14;
              const r = 0.8 + (i % 4) * 0.2;
              return <circle key={i} cx={x} cy={y} r={r} />;
            })}
          </g>
        </svg>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 30% 30%, rgba(62,224,196,0.18), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(36,112,240,0.22), transparent 70%)"
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Global Consultation"
          title="Mental healthcare beyond borders."
          description="For Indians abroad, NRI families and international enquiries — guidance that respects geography, language and time."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.2,0.7,0.2,1] }}
            className="lg:col-span-5 glass-strong rounded-3xl p-7 sm:p-8 glass-shine"
          >
            <div className="eyebrow">Cross-border care</div>
            <h3 className="h2 mt-4 text-gradient">
              One conversation. Wherever you are.
            </h3>
            <p className="lead mt-5">
              Booked through the clinic, conducted with the same clinical rigour as in-person visits.
              Where local regulation allows.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">Encrypted</span>
              <span className="chip">Documented</span>
              <span className="chip">Reviewed</span>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3.5">
            {features.map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="glass rounded-2xl p-5 glass-shine"
              >
                <div className="w-10 h-10 rounded-xl glass-faint flex items-center justify-center text-teal-400">
                  <Icon name={f.i} />
                </div>
                <h4 className="mt-4 text-[15px] font-medium">{f.t}</h4>
                <p className="text-sm text-white/60 mt-1.5 leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/45 max-w-xl mx-auto">
          Availability of consultation may depend upon applicable medical regulations and jurisdiction.
        </p>
      </div>
    </section>
  );
}
