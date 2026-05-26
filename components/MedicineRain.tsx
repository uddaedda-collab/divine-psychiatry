"use client";

import {
  Capsule,
  Tablet,
  OvalPill,
  MedBottle,
  Syringe,
  Droplet,
  Dna,
  HeartPulse,
  RxBadge,
  CrossPlus,
  ScrollFloat
} from "@/components/primitives/MedicalDecor";

/**
 * Floating medicine layer that lives behind everything.
 * Scattered across viewport heights, each parallax-floated at different speed.
 * Hidden on small screens to keep mobile snappy.
 */

type Pos = { top: string; left?: string; right?: string; speed: number; drift: number; spin: number; opacity: number };

const positions: { kind: string; props: Record<string, unknown>; pos: Pos }[] = [
  // ─── 0–100vh
  { kind: "capsule", props: { hue: "teal", size: 90, rotate: -18 },
    pos: { top: "8vh", left: "6%", speed: 0.12, drift: 0.6, spin: 8, opacity: 0.85 } },
  { kind: "tablet", props: { tint: "white", size: 50, rotate: 0 },
    pos: { top: "16vh", right: "10%", speed: 0.18, drift: 0.4, spin: -10, opacity: 0.85 } },
  { kind: "oval", props: { hue: "blue", size: 80, rotate: 24 },
    pos: { top: "28vh", left: "32%", speed: 0.08, drift: 0.5, spin: 6, opacity: 0.8 } },
  { kind: "syringe", props: { rotate: -22, size: 130 },
    pos: { top: "40vh", right: "4%", speed: 0.22, drift: 0.3, spin: 4, opacity: 0.7 } },
  { kind: "droplet", props: { hue: "teal", size: 30 },
    pos: { top: "55vh", left: "12%", speed: 0.3, drift: 0.7, spin: 0, opacity: 0.85 } },
  { kind: "rx", props: { size: 56 },
    pos: { top: "62vh", right: "18%", speed: 0.14, drift: 0.5, spin: -6, opacity: 0.6 } },

  // ─── 100–200vh
  { kind: "capsule", props: { hue: "gold", size: 70, rotate: 18 },
    pos: { top: "92vh", left: "10%", speed: 0.18, drift: 0.5, spin: 8, opacity: 0.9 } },
  { kind: "tablet", props: { tint: "blue", size: 60 },
    pos: { top: "108vh", right: "8%", speed: 0.1, drift: 0.4, spin: 12, opacity: 0.85 } },
  { kind: "bottle", props: { size: 90, rotate: -8 },
    pos: { top: "120vh", left: "4%", speed: 0.16, drift: 0.3, spin: 5, opacity: 0.8 } },
  { kind: "capsule", props: { hue: "rose", size: 56, rotate: -28 },
    pos: { top: "134vh", right: "26%", speed: 0.24, drift: 0.6, spin: -8, opacity: 0.85 } },
  { kind: "oval", props: { hue: "teal", size: 70, rotate: -8 },
    pos: { top: "156vh", left: "22%", speed: 0.1, drift: 0.5, spin: 6, opacity: 0.85 } },
  { kind: "dna", props: { size: 110 },
    pos: { top: "168vh", right: "6%", speed: 0.2, drift: 0.4, spin: 10, opacity: 0.55 } },

  // ─── 200–300vh
  { kind: "capsule", props: { hue: "violet", size: 64, rotate: 12 },
    pos: { top: "200vh", left: "8%", speed: 0.14, drift: 0.5, spin: 6, opacity: 0.85 } },
  { kind: "syringe", props: { rotate: 18, size: 100 },
    pos: { top: "212vh", right: "12%", speed: 0.18, drift: 0.4, spin: -4, opacity: 0.7 } },
  { kind: "tablet", props: { tint: "rose", size: 44 },
    pos: { top: "230vh", left: "38%", speed: 0.26, drift: 0.6, spin: 14, opacity: 0.9 } },
  { kind: "heart", props: { size: 58 },
    pos: { top: "246vh", right: "32%", speed: 0.2, drift: 0.5, spin: 0, opacity: 0.9 } },
  { kind: "capsule", props: { hue: "blue", size: 80, rotate: -8 },
    pos: { top: "262vh", left: "16%", speed: 0.1, drift: 0.5, spin: 6, opacity: 0.8 } },
  { kind: "droplet", props: { hue: "blue", size: 26 },
    pos: { top: "278vh", right: "20%", speed: 0.32, drift: 0.7, spin: 0, opacity: 0.85 } },

  // ─── 300–400vh
  { kind: "oval", props: { hue: "rose", size: 60, rotate: 8 },
    pos: { top: "302vh", left: "6%", speed: 0.16, drift: 0.5, spin: -8, opacity: 0.85 } },
  { kind: "rx", props: { size: 48 },
    pos: { top: "316vh", right: "14%", speed: 0.12, drift: 0.4, spin: 4, opacity: 0.65 } },
  { kind: "capsule", props: { hue: "teal", size: 54, rotate: 22 },
    pos: { top: "334vh", left: "30%", speed: 0.22, drift: 0.6, spin: 10, opacity: 0.85 } },
  { kind: "bottle", props: { size: 76, rotate: 6 },
    pos: { top: "350vh", right: "8%", speed: 0.14, drift: 0.4, spin: -6, opacity: 0.75 } },
  { kind: "tablet", props: { tint: "teal", size: 50 },
    pos: { top: "368vh", left: "42%", speed: 0.2, drift: 0.5, spin: 12, opacity: 0.9 } },

  // ─── 400+ tail
  { kind: "capsule", props: { hue: "gold", size: 60, rotate: -16 },
    pos: { top: "402vh", right: "10%", speed: 0.16, drift: 0.5, spin: 8, opacity: 0.85 } },
  { kind: "dna", props: { size: 90 },
    pos: { top: "418vh", left: "4%", speed: 0.22, drift: 0.4, spin: 8, opacity: 0.5 } },
  { kind: "oval", props: { hue: "gold", size: 66, rotate: -18 },
    pos: { top: "436vh", left: "32%", speed: 0.12, drift: 0.5, spin: 6, opacity: 0.85 } },
  { kind: "capsule", props: { hue: "teal", size: 70, rotate: 24 },
    pos: { top: "452vh", right: "18%", speed: 0.18, drift: 0.6, spin: -10, opacity: 0.85 } },

  // ─── Tiny accent crosses scattered
  { kind: "cross", props: {},
    pos: { top: "22vh", left: "48%", speed: 0.4, drift: 1, spin: 0, opacity: 0.6 } },
  { kind: "cross", props: {},
    pos: { top: "146vh", right: "44%", speed: 0.35, drift: 0.8, spin: 0, opacity: 0.5 } },
  { kind: "cross", props: {},
    pos: { top: "286vh", left: "52%", speed: 0.45, drift: 1, spin: 0, opacity: 0.55 } },
  { kind: "cross", props: {},
    pos: { top: "388vh", right: "40%", speed: 0.4, drift: 0.9, spin: 0, opacity: 0.55 } }
];

function Glyph({ kind, props }: { kind: string; props: Record<string, unknown> }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = props as any;
  switch (kind) {
    case "capsule": return <Capsule {...p} />;
    case "tablet": return <Tablet {...p} />;
    case "oval": return <OvalPill {...p} />;
    case "bottle": return <MedBottle {...p} />;
    case "syringe": return <Syringe {...p} />;
    case "droplet": return <Droplet {...p} />;
    case "dna": return <Dna {...p} />;
    case "heart": return <HeartPulse {...p} />;
    case "rx": return <RxBadge {...p} />;
    case "cross": return <CrossPlus className="w-3.5 h-3.5 text-teal-400" />;
    default: return null;
  }
}

export default function MedicineRain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block overflow-hidden"
    >
      {/* Ambient soft shines/blooms scattered across vertical scroll */}
      <div className="absolute inset-0 opacity-70" style={{
        background:
          "radial-gradient(28% 22% at 12% 28%, rgba(62,224,196,0.18), transparent 65%),"
          + "radial-gradient(24% 20% at 88% 60%, rgba(79,147,255,0.18), transparent 65%),"
          + "radial-gradient(22% 18% at 22% 82%, rgba(233,200,122,0.10), transparent 65%)"
      }} />

      {positions.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: p.pos.top,
            left: p.pos.left,
            right: p.pos.right,
            opacity: p.pos.opacity
          }}
        >
          <ScrollFloat speed={p.pos.speed} drift={p.pos.drift} spin={p.pos.spin}>
            <Glyph kind={p.kind} props={p.props} />
          </ScrollFloat>
        </div>
      ))}
    </div>
  );
}
