/**
 * Lightweight, GPU-friendly medical decorations.
 * - Pure SVG + CSS keyframes (no JS animations)
 * - All transforms only (no layout thrash, no large blurs)
 * - Hidden on small screens to keep mobile snappy
 */

export function Capsule({
  className = "",
  rotate = 0,
  hue = "teal",
  size = 90
}: {
  className?: string;
  rotate?: number;
  hue?: "teal" | "blue" | "gold";
  size?: number;
}) {
  const colors = {
    teal: { a: "#3ee0c4", b: "#0fa389" },
    blue: { a: "#83b7ff", b: "#2470f0" },
    gold: { a: "#e9c87a", b: "#d4ac4a" }
  } as const;
  const c = colors[hue];
  return (
    <svg
      width={size}
      height={size * 0.42}
      viewBox="0 0 100 42"
      aria-hidden
      className={className}
      style={{ ["--r" as never]: `${rotate}deg`, transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <linearGradient id={`cap-a-${c.a}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#cfd9ec" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`cap-b-${c.a}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.a} />
          <stop offset="1" stopColor={c.b} />
        </linearGradient>
      </defs>
      <g>
        <rect x="2" y="6" width="50" height="30" rx="15" fill={`url(#cap-a-${c.a})`} />
        <rect x="48" y="6" width="50" height="30" rx="15" fill={`url(#cap-b-${c.a})`} />
        <rect x="6" y="11" width="14" height="6" rx="3" fill="#ffffff" opacity="0.7" />
      </g>
    </svg>
  );
}

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
  // Stylised neuron / synapse mesh — abstract, calm
  const nodes = [
    [80, 60],
    [180, 30],
    [260, 110],
    [360, 50],
    [440, 130],
    [520, 70],
    [120, 180],
    [240, 220],
    [360, 200],
    [480, 230]
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
      <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="34"
        fill="#3ee0c4"
        fontWeight="600"
      >
        ℞
      </text>
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
      <path
        d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Floating cluster of medical icons inside a section corner.
 * Hidden on mobile to keep things snappy.
 */
export function FloatingMedicalCluster({
  className = "",
  variant = "topRight"
}: {
  className?: string;
  variant?: "topRight" | "bottomLeft";
}) {
  const baseClass = "pointer-events-none absolute hidden md:block opacity-80 select-none";
  if (variant === "bottomLeft") {
    return (
      <div className={`${baseClass} ${className}`}>
        <Capsule className="absolute -bottom-4 left-2 animate-floatA" rotate={-18} hue="teal" size={70} />
        <Capsule className="absolute bottom-16 left-24 animate-floatB" rotate={28} hue="blue" size={56} />
        <CrossPlus className="absolute bottom-28 left-2 w-4 h-4 text-teal-400 animate-glowSoft" />
        <RxBadge className="absolute bottom-2 left-44 w-9 h-9 animate-floatC" />
      </div>
    );
  }
  return (
    <div className={`${baseClass} ${className}`}>
      <Capsule className="absolute top-2 right-6 animate-floatA" rotate={20} hue="gold" size={64} />
      <Capsule className="absolute top-20 right-28 animate-floatB" rotate={-12} hue="teal" size={48} />
      <CrossPlus className="absolute top-3 right-40 w-4 h-4 text-teal-400 animate-glowSoft" />
      <RxBadge className="absolute top-32 right-3 w-9 h-9 animate-floatC" />
    </div>
  );
}
