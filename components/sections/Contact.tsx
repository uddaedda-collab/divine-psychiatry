"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/primitives/SectionHeading";
import Icon from "@/components/primitives/Icons";
import { site } from "@/lib/site";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const subject = encodeURIComponent("Appointment request · Divine Psychiatry Clinic");
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nConcern: ${fd.get("concern")}\nPreferred time: ${fd.get("time")}\n\nMessage:\n${fd.get("message")}`
    );
    window.location.href = `${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  }

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Reach out, in confidence."
          description="Whether it's a first conversation, a follow-up or a global enquiry — we respond with care."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -32, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.2,0.7,0.2,1] }}
            className="lg:col-span-5 glass-strong rounded-3xl p-7 sm:p-8 glass-shine"
          >
            <h3 className="h3">Clinic & Contact</h3>
            <p className="text-sm text-white/60 mt-2">{site.brand} · {site.city}</p>

            <ul className="mt-6 space-y-3.5">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl glass-faint flex items-center justify-center text-teal-400"><Icon name="phone" /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Phone</div>
                  <a className="text-sm" href={site.phone}>{site.phoneDisplay}</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl glass-faint flex items-center justify-center text-teal-400"><Icon name="whatsapp" /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">WhatsApp</div>
                  <a className="text-sm" href={site.whatsapp} target="_blank" rel="noopener">Chat with the clinic</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl glass-faint flex items-center justify-center text-teal-400"><Icon name="mail" /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Email</div>
                  <a className="text-sm" href={site.email}>{site.emailDisplay}</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl glass-faint flex items-center justify-center text-teal-400"><Icon name="pin" /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Location</div>
                  <a className="text-sm" href={site.mapsQuery} target="_blank" rel="noopener">View on Google Maps</a>
                </div>
              </li>
            </ul>

            <div className="mt-7 rounded-2xl overflow-hidden border border-white/10 ratio-wide relative">
              <iframe
                title="Clinic location"
                src="https://www.google.com/maps?q=Sri+Ganganagar+Rajasthan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[0.2] opacity-90"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip"><Icon name="check" /> {site.hours}</span>
              <span className="chip"><Icon name="shield" /> Confidential</span>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 32, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.2,0.7,0.2,1] }}
            className="lg:col-span-7 glass-strong rounded-3xl p-7 sm:p-8 glass-shine"
          >
            <h3 className="h3">Appointment Request</h3>
            <p className="text-sm text-white/60 mt-2">
              Brief us. We will respond with availability and any prep needed.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
              <Field label="Full name" name="name" placeholder="Your name" required />
              <Field label="Phone" name="phone" placeholder="+91" required />
              <Field label="Primary concern" name="concern" placeholder="Anxiety, sleep, addiction…" />
              <Field label="Preferred time" name="time" placeholder="Eg. Sat morning" />
            </div>

            <label className="block mt-3.5">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Anything you would like the clinic to know in advance."
                className="mt-1.5 w-full glass-faint rounded-xl px-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30"
              />
            </label>

            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              <p className="text-xs text-white/45 max-w-md">
                Submitting opens your email client with the request prefilled. Your data never touches a third-party server.
              </p>
              <button type="submit" className="btn btn-primary">
                Send request <Icon name="arrow" />
              </button>
            </div>

            {sent && (
              <div className="mt-4 text-xs text-teal-400">
                Email draft prepared. Send from your client to confirm.
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  required
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full glass-faint rounded-xl px-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30"
      />
    </label>
  );
}
