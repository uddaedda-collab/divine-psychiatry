"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon, { IconName } from "@/components/primitives/Icons";

/* ----------------------------- Avatar ----------------------------- */

export function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export function Avatar({
  name,
  size = 40,
  tone = "from-teal-400 to-brand-500"
}: {
  name: string;
  size?: number;
  tone?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br ${tone} text-ink-950 font-medium`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initialsOf(name) || "?"}
    </span>
  );
}

/* ----------------------------- Badge ----------------------------- */

const badgeTones: Record<string, string> = {
  pending: "bg-amber-400/15 text-amber-200 border-amber-300/25",
  confirmed: "bg-brand-400/15 text-brand-200 border-brand-300/25",
  completed: "bg-emerald-400/15 text-emerald-200 border-emerald-300/25",
  cancelled: "bg-rose-400/15 text-rose-200 border-rose-300/25",
  neutral: "bg-white/8 text-white/70 border-white/15",
  teal: "bg-teal-400/15 text-teal-200 border-teal-300/25"
};

export function Badge({ tone = "neutral", children }: { tone?: string; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize ${
        badgeTones[tone] ?? badgeTones.neutral
      }`}
    >
      {children}
    </span>
  );
}

/* ----------------------------- StatCard ----------------------------- */

export function StatCard({
  icon,
  label,
  value,
  hint
}: {
  icon: IconName;
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="glass glass-shine rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl glass-faint flex items-center justify-center text-teal-400">
          <Icon name={icon} size={20} />
        </div>
        {hint && <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">{hint}</span>}
      </div>
      <div className="mt-4 font-display text-3xl text-gradient-cool">{value}</div>
      <div className="mt-1 text-[12px] uppercase tracking-[0.16em] text-white/50">{label}</div>
    </div>
  );
}

/* ----------------------------- Card ----------------------------- */

export function Card({
  title,
  action,
  children,
  className = ""
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass glass-shine rounded-2xl p-5 sm:p-6 ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 mb-4">
          {title && <h3 className="h3 text-white">{title}</h3>}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/* ----------------------------- Fields ----------------------------- */

export function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  min
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        min={min}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full glass-faint rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30 [color-scheme:dark]"
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">{label}</span>
      <textarea
        name={name}
        rows={rows}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full glass-faint rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30"
      />
    </label>
  );
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  required
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">{label}</span>
      <select
        name={name}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full glass-faint rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 [color-scheme:dark]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-800 text-white">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ----------------------------- Button ----------------------------- */

export function Button({
  children,
  onClick,
  variant = "default",
  type = "button",
  className = "",
  disabled
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "ghost" | "danger";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const v =
    variant === "primary"
      ? "btn btn-primary"
      : variant === "danger"
      ? "btn !border-rose-300/30 !bg-rose-500/15 text-rose-100 hover:!border-rose-300/50"
      : variant === "ghost"
      ? "btn btn-ghost"
      : "btn";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${v} text-[13px] ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

/* ----------------------------- EmptyState ----------------------------- */

export function EmptyState({
  icon = "clipboard",
  title,
  hint,
  action
}: {
  icon?: IconName;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass-faint rounded-2xl p-10 text-center">
      <div className="mx-auto w-12 h-12 rounded-2xl glass flex items-center justify-center text-teal-400">
        <Icon name={icon} size={22} />
      </div>
      <p className="mt-4 text-white/80">{title}</p>
      {hint && <p className="mt-1.5 text-sm text-white/45 max-w-sm mx-auto">{hint}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

/* ----------------------------- Modal ----------------------------- */

export function Modal({
  open,
  onClose,
  title,
  children,
  wide
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className={`relative glass-strong rounded-3xl p-6 sm:p-7 w-full ${
              wide ? "max-w-2xl" : "max-w-lg"
            } max-h-[88vh] overflow-y-auto`}
          >
            <header className="flex items-center justify-between gap-4 mb-5">
              <h3 className="h3 text-white">{title}</h3>
              <button
                aria-label="Close"
                onClick={onClose}
                className="w-9 h-9 rounded-xl glass-faint flex items-center justify-center text-white/70 hover:text-white"
              >
                <Icon name="x" size={18} />
              </button>
            </header>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- Toast ----------------------------- */

export function Toast({ message, onDone }: { message: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [message, onDone]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[120] glass-strong rounded-full px-5 py-3 text-sm flex items-center gap-2.5"
        >
          <span className="text-teal-400">
            <Icon name="check" size={18} />
          </span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- misc ----------------------------- */

export function fmtDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
      <span className="text-[12px] uppercase tracking-[0.14em] text-white/45">{label}</span>
      <span className="text-sm text-white/85 text-right">{value}</span>
    </div>
  );
}
