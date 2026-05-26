export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3ee0c4" />
            <stop offset="1" stopColor="#4f93ff" />
          </linearGradient>
        </defs>
        <path
          d="M16 4c4 3 6 7 6 11s-2 8-6 12c-4-4-6-8-6-12s2-8 6-11Z"
          fill="url(#lg)"
          opacity="0.95"
        />
        <path
          d="M16 4c4 3 6 7 6 11s-2 8-6 12"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.6"
        />
        <circle cx="16" cy="15" r="2.2" fill="#04070d" />
      </svg>
      <span className="font-display text-[15px] tracking-tight">
        Divine <span className="text-white/60">Psychiatry</span>
      </span>
      <span className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-400/15 text-teal-400 font-serif leading-none text-sm" aria-hidden>℞</span>
    </span>
  );
}
