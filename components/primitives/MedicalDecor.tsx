"use client";

/**
 * Variety of medical micro-illustrations + a scroll-parallax floater.
 * - Pure SVG + CSS keyframes, no JS animations
 * - GPU transforms only (translate / rotate)
 * - Mobile-friendly: parallax intensity scaled per device
 */

import { useEffect, useRef } from "react";

/* ================================================================
 *  PILL / MEDICINE VARIANTS
 * ================================================================ */

export function Capsule({
  className = "",
  rotate = 0,
  hue = "teal",
  size = 90
}: {
  className?: string;
  rotate?: number;
  hue?: "teal" | "blue" | "gold" | "rose" | "violet";
  size?: number;
}) {
  const colors = {
    teal: { a: "#3ee0c4", b: "#0fa389" },
    blue: { a: "#83b7ff", b: "#2470f0" },
    gold: { a: "#e9c87a", b: "#d4ac4a" },
    rose: { a: "#f6a8b6", b: "#e0506b" },
    violet: { a: "#c2a0ff", b: "#7548d6" }
  } as const;
  const c = colors[hue];
  const id = `${hue}-${size}-${rotate}`;
  return (
    <svg
      width={size}
      height={size * 0.42}
      viewBox="0 0 100 42"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <linearGradient id={`cap-a-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#dde6f6" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`cap-b-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.a} />
          <stop offset="1" stopColor={c.b} />
        </linearGradient>
      </defs>
      <rect x="2" y="6" width="50" height="30" rx="15" fill={`url(#cap-a-${id})`} />
      <rect x="48" y="6" width="50" height="30" rx="15" fill={`url(#cap-b-${id})`} />
      <rect x="6" y="11" width="14" height="6" rx="3" fill="#ffffff" opacity="0.7" />
    </svg>
  );
}

/** Round white tablet with a score line */
export function Tablet({
  className = "",
  size = 56,
  rotate = 0,
  tint = "white"
}: {
  className?: string;
  size?: number;
  rotate?: number;
  tint?: "white" | "blue" | "teal" | "rose";
}) {
  const tints = {
    white: { face: "#ffffff", shadow: "#cdd6e9" },
    blue: { face: "#dbe7ff", shadow: "#9bbaf3" },
    teal: { face: "#d6f4ec", shadow: "#7fd9c5" },
    rose: { face: "#ffe1e6", shadow: "#f6a8b6" }
  } as const;
  const t = tints[tint];
  const id = `${tint}-${size}-${rotate}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <radialGradient id={`tab-${id}`} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.6" stopColor={t.face} />
          <stop offset="1" stopColor={t.shadow} />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill={`url(#tab-${id})`} />
      <line x1="10" y1="32" x2="54" y2="32" stroke={t.shadow} strokeWidth="1.5" opacity="0.8" />
      <ellipse cx="24" cy="22" rx="8" ry="3" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}

/** Oval pill (like ibuprofen) */
export function OvalPill({
  className = "",
  size = 70,
  rotate = 0,
  hue = "blue"
}: {
  className?: string;
  size?: number;
  rotate?: number;
  hue?: "blue" | "teal" | "rose" | "gold";
}) {
  const colors = {
    blue: { a: "#a4c5ff", b: "#4f93ff" },
    teal: { a: "#9af0e0", b: "#3ee0c4" },
    rose: { a: "#ffc2cd", b: "#f6707e" },
    gold: { a: "#f5dfa7", b: "#d4ac4a" }
  } as const;
  const c = colors[hue];
  const id = `${hue}-${size}-${rotate}`;
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 100 55"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <linearGradient id={`oval-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="0.45" stopColor={c.a} />
          <stop offset="1" stopColor={c.b} />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="94" height="42" rx="21" fill={`url(#oval-${id})`} />
      <rect x="14" y="13" width="22" height="6" rx="3" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}

/** Medicine bottle with cap and label */
export function MedBottle({
  className = "",
  size = 74,
  rotate = 0
}: {
  className?: string;
  size?: number;
  rotate?: number;
}) {
  return (
    <svg
      width={size * 0.65}
      height={size}
      viewBox="0 0 70 110"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <linearGradient id="bot-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3ee0c4" />
          <stop offset="0.5" stopColor="#5fe6cf" />
          <stop offset="1" stopColor="#0fa389" />
        </linearGradient>
        <linearGradient id="bot-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfd9ec" />
          <stop offset="1" stopColor="#7c8ba6" />
        </linearGradient>
      </defs>
      <rect x="14" y="4" width="42" height="18" rx="4" fill="url(#bot-cap)" />
      <rect x="14" y="20" width="42" height="6" rx="2" fill="#5a6982" />
      <rect x="6" y="26" width="58" height="80" rx="10" fill="url(#bot-body)" />
      <rect x="14" y="46" width="42" height="34" rx="4" fill="#ffffff" opacity="0.9" />
      <line x1="20" y1="55" x2="50" y2="55" stroke="#0fa389" strokeWidth="2" />
      <line x1="20" y1="62" x2="46" y2="62" stroke="#0fa389" strokeWidth="1.5" opacity="0.7" />
      <text x="35" y="76" textAnchor="middle" fontSize="10" fill="#0fa389" fontWeight="700" fontFamily="serif">℞</text>
    </svg>
  );
}

/** Syringe — angled */
export function Syringe({
  className = "",
  size = 110,
  rotate = -25
}: {
  className?: string;
  size?: number;
  rotate?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.32}
      viewBox="0 0 200 64"
      aria-hidden
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <linearGradient id="syr-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#cfd9ec" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* needle */}
      <line x1="2" y1="32" x2="34" y2="32" stroke="#cfd9ec" strokeWidth="2" />
      <rect x="34" y="26" width="14" height="12" rx="2" fill="#7c8ba6" />
      {/* barrel */}
      <rect x="48" y="20" width="100" height="24" rx="4" fill="url(#syr-body)" stroke="rgba(255,255,255,0.35)" />
      {/* fluid */}
      <rect x="50" y="22" width="70" height="20" rx="2" fill="#3ee0c4" opacity="0.7" />
      {/* tick marks */}
      <g stroke="#7c8ba6" strokeWidth="1">
        <line x1="60" y1="20" x2="60" y2="14" />
        <line x1="80" y1="20" x2="80" y2="14" />
        <line x1="100" y1="20" x2="100" y2="14" />
        <line x1="120" y1="20" x2="120" y2="14" />
      </g>
      {/* plunger */}
      <rect x="148" y="14" width="6" height="36" fill="#7c8ba6" />
      <rect x="154" y="22" width="40" height="20" rx="3" fill="#cfd9ec" />
      <rect x="190" y="10" width="10" height="44" rx="3" fill="#7c8ba6" />
    </svg>
  );
}

/** Blood drop */
export function Droplet({
  className = "",
  size = 36,
  hue = "teal"
}: {
  className?: string;
  size?: number;
  hue?: "teal" | "rose" | "blue";
}) {
  const colors = {
    teal: { a: "#3ee0c4", b: "#0fa389" },
    rose: { a: "#f6a8b6", b: "#d33049" },
    blue: { a: "#83b7ff", b: "#2470f0" }
  } as const;
  const c = colors[hue];
  const id = `drop-${hue}-${size}`;
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 32 40"
      aria-hidden
      className={className}
    >
      <defs>
        <radialGradient id={id} cx="40%" cy="60%" r="60%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.5" stopColor={c.a} />
          <stop offset="1" stopColor={c.b} />
        </radialGradient>
      </defs>
      <path d="M16 2 C8 14 4 22 4 28 a12 12 0 0 0 24 0 c0-6-4-14-12-26z" fill={`url(#${id})`} />
      <ellipse cx="12" cy="22" rx="3" ry="5" fill="#ffffff" opacity="0.4" />
    </svg>
  );
}

/** DNA helix */
export function Dna({ className = "", size = 100 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size * 0.45}
      height={size}
      viewBox="0 0 45 110"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id="dna-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3ee0c4" />
          <stop offset="1" stopColor="#4f93ff" />
        </linearGradient>
      </defs>
      <path d="M5 5 Q 22 22 40 5 M40 25 Q 22 42 5 25 M5 45 Q 22 62 40 45 M40 65 Q 22 82 5 65 M5 85 Q 22 102 40 85"
            fill="none" stroke="url(#dna-a)" strokeWidth="2.5" strokeLinecap="round" />
      <g stroke="rgba(180,212,255,0.6)" strokeWidth="1.4">
        <line x1="10" y1="14" x2="35" y2="14" />
        <line x1="10" y1="34" x2="35" y2="34" />
        <line x1="10" y1="54" x2="35" y2="54" />
        <line x1="10" y1="74" x2="35" y2="74" />
        <line x1="10" y1="94" x2="35" y2="94" />
      </g>
    </svg>
  );
}

/** Heart-with-pulse */
export function HeartPulse({ className = "", size = 60 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className={className}>
      <defs>
        <linearGradient id="hp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff8398" />
          <stop offset="1" stopColor="#e0506b" />
        </linearGradient>
      </defs>
      <path d="M32 56 C 8 42 4 26 14 18 C 22 12 28 18 32 24 C 36 18 42 12 50 18 C 60 26 56 42 32 56 Z" fill="url(#hp)" />
      <path d="M10 36 H22 L26 26 L32 46 L38 32 L42 38 H56" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================
 *  EXISTING ATOMS
 * ================================================================ */

export function PulseLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 80" aria-hidden className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="pulse-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3ee0c4" stopOpacity="0" />
          <stop offset="0.2" stopColor="#3ee0c4" stopOpacity="0.7" />
          <stop offset="0.8" stopColor="#4f93ff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#4f93ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 40 L120 40 L150 40 L160 20 L172 60 L184 14 L196 66 L208 30 L220 40 L360 40 L380 40 L392 22 L404 58 L416 40 L600 40"
        fill="none"
        stroke="url(#pulse-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NeuronWeb({ className = "" }: { className?: string }) {
  const nodes = [
    [80, 60], [180, 30], [260, 110], [360, 50], [440, 130],
    [520, 70], [120, 180], [240, 220], [360, 200], [480, 230]
  ] as const;
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 6], [3, 4], [4, 5], [4, 8], [6, 7], [7, 8], [7, 2], [8, 9], [5, 9]
  ];
  return (
    <svg viewBox="0 0 600 280" aria-hidden className={className}>
      <defs>
        <radialGradient id="node-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3ee0c4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#3ee0c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="rgba(180,212,255,0.18)" strokeWidth="1" fill="none">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill="url(#node-grad)" opacity="0.8" />
            <circle cx={x} cy={y} r="2.2" fill="#cfe1ff" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function RxBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" />
      <text x="32" y="42" textAnchor="middle" fontFamily="serif" fontSize="34" fill="#3ee0c4" fontWeight="600">℞</text>
    </svg>
  );
}

export function StethoArc({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden className={className} fill="none" stroke="currentColor">
      <path d="M30 10 v30 a40 40 0 0 0 80 0 v-30" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="10" r="4" fill="currentColor" />
      <circle cx="110" cy="10" r="4" fill="currentColor" />
      <path d="M70 80 v15 a18 18 0 0 0 36 0 v-5" strokeWidth="3" strokeLinecap="round" />
      <circle cx="124" cy="80" r="14" strokeWidth="3" />
      <circle cx="124" cy="80" r="6" fill="currentColor" />
    </svg>
  );
}

export function CrossPlus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================
 *  ScrollFloat — kept for compatibility, but heavy work is done by
 *  the global MedicineRain shared rAF.
 * ================================================================ */

import { useEffect as _useEffect, useRef as _useRef } from "react";

export function ScrollFloat({
  children,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  drift?: number;
  spin?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {children}
    </div>
  );
}
