"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import Icon from "@/components/primitives/Icons";
import { PulseLine } from "@/components/primitives/MedicalDecor";
import { Button, Field } from "@/components/portal/ui";
import { doctorProfile } from "@/lib/clinic";
import {
  DEMO,
  ensureSeed,
  getCurrentUser,
  login,
  register,
  type Role
} from "@/lib/db";

type Mode = "signin" | "register";

const patientPerks = [
  { i: "calendar", t: "Book & track appointments" },
  { i: "pill", t: "View prescriptions" },
  { i: "file", t: "Access medical records" },
  { i: "message", t: "Message the clinic securely" }
] as const;

const doctorPerks = [
  { i: "grid", t: "Practice dashboard & analytics" },
  { i: "users", t: "Manage patients & history" },
  { i: "clipboard", t: "Confirm & schedule appointments" },
  { i: "edit", t: "Write digital prescriptions" }
] as const;

export default function PortalAuth() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("patient");
  const [mode, setMode] = useState<Mode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    ensureSeed();
    const u = getCurrentUser();
    if (u) {
      router.replace(u.role === "doctor" ? "/portal/doctor" : "/portal/patient");
      return;
    }
    setChecking(false);
  }, [router]);

  function go(r: Role) {
    router.replace(r === "doctor" ? "/portal/doctor" : "/portal/patient");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      if (!name || !email || !phone || !password) {
        setError("Please fill in all fields.");
        return;
      }
      const res = register({ name, email, phone, password });
      if (!res.ok) return setError(res.error);
      go("patient");
      return;
    }

    const res = login(email, password, role);
    if (!res.ok) return setError(res.error);
    go(res.user.role);
  }

  function fillDemo() {
    const creds = role === "doctor" ? DEMO.doctor : DEMO.patient;
    setEmail(creds.email);
    setPassword(creds.password);
    setMode("signin");
    setError(null);
  }

  const perks = role === "doctor" ? doctorPerks : patientPerks;

  if (checking) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="glass-strong rounded-2xl px-6 py-4 text-sm text-white/70 flex items-center gap-3">
          <span className="text-teal-400 animate-pulse">
            <Icon name="stethoscope" size={20} />
          </span>
          Loading portal…
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-5 items-stretch">
        {/* Left — brand / perks */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="glass-strong glass-shine rounded-3xl p-7 sm:p-9 flex flex-col"
        >
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <PulseLine className="mt-6 h-8 opacity-70" />
          <h2 className="h2 mt-6 text-gradient">
            {role === "doctor" ? "Clinic command centre." : "Your care, in one calm place."}
          </h2>
          <p className="lead mt-4">
            {role === "doctor"
              ? `Sign in to manage appointments, patients and prescriptions for ${doctorProfile.name}.`
              : "Book appointments, view prescriptions and reach the clinic — privately and securely."}
          </p>

          <ul className="mt-8 space-y-3">
            {perks.map((p) => (
              <li key={p.t} className="flex items-center gap-3 text-sm text-white/80">
                <span className="w-9 h-9 rounded-xl glass-faint flex items-center justify-center text-teal-400">
                  <Icon name={p.i as any} size={18} />
                </span>
                {p.t}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8 flex flex-wrap gap-2">
            <span className="chip"><Icon name="shield" size={14} /> Confidential</span>
            <span className="chip"><Icon name="lock" size={14} /> Private to this device</span>
          </div>
        </motion.div>

        {/* Right — auth form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="glass-strong glass-shine rounded-3xl p-7 sm:p-9"
        >
          {/* Role switch */}
          <div className="grid grid-cols-2 gap-2 p-1 glass-faint rounded-2xl">
            {(["patient", "doctor"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setError(null);
                  if (r === "doctor") setMode("signin");
                }}
                className={`rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition ${
                  role === r ? "btn-primary !rounded-xl" : "text-white/60 hover:text-white"
                }`}
              >
                <Icon name={r === "doctor" ? "stethoscope" : "user"} size={17} />
                {r === "doctor" ? "Doctor" : "Patient"}
              </button>
            ))}
          </div>

          {/* Sign in / register (patient only) */}
          {role === "patient" && (
            <div className="mt-4 flex items-center gap-4 text-sm">
              {(["signin", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setError(null);
                  }}
                  className={`pb-1.5 border-b-2 transition ${
                    mode === m ? "border-teal-400 text-white" : "border-transparent text-white/50 hover:text-white/80"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-3.5">
            {mode === "register" && role === "patient" && (
              <>
                <Field label="Full name" name="name" value={name} onChange={setName} placeholder="Your name" required />
                <Field label="Phone" name="phone" value={phone} onChange={setPhone} placeholder="+91" required />
              </>
            )}
            <Field
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              required
            />
            <Field
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
            />

            {error && (
              <div className="rounded-xl border border-rose-300/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full justify-center !py-3">
              {mode === "register" ? "Create account" : `Sign in as ${role}`}
              <Icon name="arrow" size={16} />
            </Button>
          </form>

          {/* Demo helper */}
          <div className="mt-6 rounded-2xl glass-faint p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/45">Demo access</div>
              <button onClick={fillDemo} className="text-xs text-teal-300 hover:text-teal-200 inline-flex items-center gap-1">
                <Icon name="sparkle" size={14} /> Fill {role} credentials
              </button>
            </div>
            <div className="mt-2 text-xs text-white/55 leading-relaxed">
              {role === "doctor" ? (
                <>Doctor · <span className="text-white/80">{DEMO.doctor.email}</span> / <span className="text-white/80">{DEMO.doctor.password}</span></>
              ) : (
                <>Patient · <span className="text-white/80">{DEMO.patient.email}</span> / <span className="text-white/80">{DEMO.patient.password}</span></>
              )}
            </div>
          </div>

          <Link href="/" className="mt-5 inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white">
            <Icon name="home" size={14} /> Back to website
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
