"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  CrossPlus
} from "@/components/primitives/MedicalDecor";

/* ------------------------------------------------------------------
 * MedicineRain
 *
 *  - Single shared scroll listener + single rAF for all items
 *  - Each item updates transform only when near the viewport
 *  - Picks density + size scale based on device tier (mobile / tablet / desktop)
 *  - Respects prefers-reduced-motion (animation off, items still visible)
 * ------------------------------------------------------------------ */

type Pos = {
  top: number; // in vh units
  side: "left" | "right";
  offset: string; // CSS percent
  speed: number;
  drift: number;
  spin: number;
  opacity: number;
  mobile?: boolean; // include on mobile?
};

type Item = { kind: string; props: Record<string, unknown>; pos: Pos };

// Master list. `mobile: true` items also appear on small screens (curated subset).
const items: Item[] = [
  // ─── Hero / 0–100vh
  { kind: "capsule", props: { hue: "teal", size: 90, rotate: -18 },
    pos: { top: 8, side: "left", offset: "6%", speed: 0.12, drift: 0.6, spin: 8, opacity: 0.85, mobile: true } },
  { kind: "tablet", props: { tint: "white", size: 50, rotate: 0 },
    pos: { top: 16, side: "right", offset: "10%", speed: 0.18, drift: 0.4, spin: -10, opacity: 0.85, mobile: true } },
  { kind: "oval", props: { hue: "blue", size: 80, rotate: 24 },
    pos: { top: 28, side: "left", offset: "32%", speed: 0.08, drift: 0.5, spin: 6, opacity: 0.8 } },
  { kind: "syringe", props: { rotate: -22, size: 130 },
    pos: { top: 40, side: "right", offset: "4%", speed: 0.22, drift: 0.3, spin: 4, opacity: 0.7 } },
  { kind: "droplet", props: { hue: "teal", size: 30 },
    pos: { top: 55, side: "left", offset: "12%", speed: 0.3, drift: 0.7, spin: 0, opacity: 0.85, mobile: true } },
  { kind: "rx", props: { size: 56 },
    pos: { top: 62, side: "right", offset: "18%", speed: 0.14, drift: 0.5, spin: -6, opacity: 0.6 } },

  // ─── 100–200vh
  { kind: "capsule", props: { hue: "gold", size: 70, rotate: 18 },
    pos: { top: 92, side: "left", offset: "10%", speed: 0.18, drift: 0.5, spin: 8, opacity: 0.9, mobile: true } },
  { kind: "tablet", props: { tint: "blue", size: 60 },
    pos: { top: 108, side: "right", offset: "8%", speed: 0.1, drift: 0.4, spin: 12, opacity: 0.85, mobile: true } },
  { kind: "bottle", props: { size: 90, rotate: -8 },
    pos: { top: 120, side: "left", offset: "4%", speed: 0.16, drift: 0.3, spin: 5, opacity: 0.8 } },
  { kind: "capsule", props: { hue: "rose", size: 56, rotate: -28 },
    pos: { top: 134, side: "right", offset: "26%", speed: 0.24, drift: 0.6, spin: -8, opacity: 0.85 } },
  { kind: "oval", props: { hue: "teal", size: 70, rotate: -8 },
    pos: { top: 156, side: "left", offset: "22%", speed: 0.1, drift: 0.5, spin: 6, opacity: 0.85, mobile: true } },
  { kind: "dna", props: { size: 110 },
    pos: { top: 168, side: "right", offset: "6%", speed: 0.2, drift: 0.4, spin: 10, opacity: 0.55, mobile: true } },

  // ─── 200–300vh
  { kind: "capsule", props: { hue: "violet", size: 64, rotate: 12 },
    pos: { top: 200, side: "left", offset: "8%", speed: 0.14, drift: 0.5, spin: 6, opacity: 0.85, mobile: true } },
  { kind: "syringe", props: { rotate: 18, size: 100 },
    pos: { top: 212, side: "right", offset: "12%", speed: 0.18, drift: 0.4, spin: -4, opacity: 0.7 } },
  { kind: "tablet", props: { tint: "rose", size: 44 },
    pos: { top: 230, side: "left", offset: "38%", speed: 0.26, drift: 0.6, spin: 14, opacity: 0.9, mobile: true } },
  { kind: "heart", props: { size: 58 },
    pos: { top: 246, side: "right", offset: "32%", speed: 0.2, drift: 0.5, spin: 0, opacity: 0.9, mobile: true } },
  { kind: "capsule", props: { hue: "blue", size: 80, rotate: -8 },
    pos: { top: 262, side: "left", offset: "16%", speed: 0.1, drift: 0.5, spin: 6, opacity: 0.8 } },
  { kind: "droplet", props: { hue: "blue", size: 26 },
    pos: { top: 278, side: "right", offset: "20%", speed: 0.32, drift: 0.7, spin: 0, opacity: 0.85, mobile: true } },

  // ─── 300–400vh
  { kind: "oval", props: { hue: "rose", size: 60, rotate: 8 },
    pos: { top: 302, side: "left", offset: "6%", speed: 0.16, drift: 0.5, spin: -8, opacity: 0.85, mobile: true } },
  { kind: "rx", props: { size: 48 },
    pos: { top: 316, side: "right", offset: "14%", speed: 0.12, drift: 0.4, spin: 4, opacity: 0.65 } },
  { kind: "capsule", props: { hue: "teal", size: 54, rotate: 22 },
    pos: { top: 334, side: "left", offset: "30%", speed: 0.22, drift: 0.6, spin: 10, opacity: 0.85 } },
  { kind: "bottle", props: { size: 76, rotate: 6 },
    pos: { top: 350, side: "right", offset: "8%", speed: 0.14, drift: 0.4, spin: -6, opacity: 0.75, mobile: true } },
  { kind: "tablet", props: { tint: "teal", size: 50 },
    pos: { top: 368, side: "left", offset: "42%", speed: 0.2, drift: 0.5, spin: 12, opacity: 0.9, mobile: true } },

  // ─── 400+
  { kind: "capsule", props: { hue: "gold", size: 60, rotate: -16 },
    pos: { top: 402, side: "right", offset: "10%", speed: 0.16, drift: 0.5, spin: 8, opacity: 0.85, mobile: true } },
  { kind: "dna", props: { size: 90 },
    pos: { top: 418, side: "left", offset: "4%", speed: 0.22, drift: 0.4, spin: 8, opacity: 0.5 } },
  { kind: "oval", props: { hue: "gold", size: 66, rotate: -18 },
    pos: { top: 436, side: "left", offset: "32%", speed: 0.12, drift: 0.5, spin: 6, opacity: 0.85 } },
  { kind: "capsule", props: { hue: "teal", size: 70, rotate: 24 },
    pos: { top: 452, side: "right", offset: "18%", speed: 0.18, drift: 0.6, spin: -10, opacity: 0.85, mobile: true } },

  // tiny crosses
  { kind: "cross", props: {},
    pos: { top: 22, side: "left", offset: "48%", speed: 0.4, drift: 1, spin: 0, opacity: 0.6, mobile: true } },
  { kind: "cross", props: {},
    pos: { top: 146, side: "right", offset: "44%", speed: 0.35, drift: 0.8, spin: 0, opacity: 0.5 } },
  { kind: "cross", props: {},
    pos: { top: 286, side: "left", offset: "52%", speed: 0.45, drift: 1, spin: 0, opacity: 0.55, mobile: true } },
  { kind: "cross", props: {},
    pos: { top: 388, side: "right", offset: "40%", speed: 0.4, drift: 0.9, spin: 0, opacity: 0.55 } }
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

type Tier = "mobile" | "tablet" | "desktop";

function getTier(): Tier {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export default function MedicineRain() {
  const [tier, setTier] = useState<Tier>("desktop");
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setTier(getTier());
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onResize = () => setTier(getTier());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Filter list by device tier
  const list = useMemo(() => {
    if (tier === "mobile") return items.filter((it) => it.pos.mobile);
    return items;
  }, [tier]);

  // Scale sizes per device
  const scale = tier === "mobile" ? 0.55 : tier === "tablet" ? 0.85 : 1;
  const speedFactor = tier === "mobile" ? 0.6 : tier === "tablet" ? 0.85 : 1;

  // Refs to all glyph wrappers
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  // Per-item state for eased transform
  const targetsRef = useRef<{ y: number; x: number; r: number }[]>([]);
  const currentRef = useRef<{ y: number; x: number; r: number }[]>([]);
  // Items we'll actually update (in/near viewport)
  const activeRef = useRef<Set<number>>(new Set());

  // Initialise per-item state arrays whenever list length changes
  useEffect(() => {
    targetsRef.current = list.map(() => ({ y: 0, x: 0, r: 0 }));
    currentRef.current = list.map(() => ({ y: 0, x: 0, r: 0 }));
  }, [list]);

  // Single scroll listener + single rAF for all items
  useEffect(() => {
    if (reduce) return;

    let raf = 0;
    let pendingUpdate = false;

    const computeTargets = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const padding = vh * 0.4; // start updating items 40% before they appear

      list.forEach((it, i) => {
        const el = refs.current[i];
        if (!el) return;

        // each item's "anchor" position in document = top vh * 100 of vh (px)
        const anchor = (it.pos.top / 100) * vh;
        const distFromViewport = anchor - scrollY;
        const isNear =
          distFromViewport > -padding - vh * 0.5 &&
          distFromViewport < vh + padding + vh * 0.5;

        if (!isNear) {
          activeRef.current.delete(i);
          return;
        }
        activeRef.current.add(i);

        // y parallax: distance from viewport center scaled by speed
        const center = distFromViewport - vh / 2;
        targetsRef.current[i].y = -center * it.pos.speed * speedFactor;
        targetsRef.current[i].x =
          Math.sin(scrollY * 0.002 + i * 0.4) * 22 * it.pos.drift * speedFactor;
        targetsRef.current[i].r = (scrollY / 1000) * it.pos.spin * speedFactor;
      });
    };

    const tick = () => {
      // Ease current toward target
      activeRef.current.forEach((i) => {
        const t = targetsRef.current[i];
        const c = currentRef.current[i];
        if (!t || !c) return;
        c.y += (t.y - c.y) * 0.12;
        c.x += (t.x - c.x) * 0.12;
        c.r += (t.r - c.r) * 0.12;
        const el = refs.current[i];
        if (el) {
          el.style.transform =
            `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) rotate(${c.r.toFixed(2)}deg)`;
        }
      });
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (pendingUpdate) return;
      pendingUpdate = true;
      // schedule target update at next frame
      requestAnimationFrame(() => {
        computeTargets();
        pendingUpdate = false;
      });
    };

    computeTargets();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeTargets);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeTargets);
    };
  }, [list, reduce, speedFactor]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {/* Ambient soft shines */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(28% 22% at 12% 28%, rgba(62,224,196,0.18), transparent 65%),"
            + "radial-gradient(24% 20% at 88% 60%, rgba(79,147,255,0.18), transparent 65%),"
            + "radial-gradient(22% 18% at 22% 82%, rgba(233,200,122,0.10), transparent 65%)"
        }}
      />

      {list.map((it, i) => {
        // scaled props
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const scaled: any = { ...it.props };
        if (typeof scaled.size === "number") scaled.size = Math.round(scaled.size * scale);

        const style: React.CSSProperties = {
          top: `${it.pos.top}vh`,
          opacity: it.pos.opacity,
          [it.pos.side]: it.pos.offset,
          willChange: "transform"
        };

        return (
          <div
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            className="absolute"
            style={style}
          >
            <Glyph kind={it.kind} props={scaled} />
          </div>
        );
      })}
    </div>
  );
}
