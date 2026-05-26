export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden>
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3ee0c4" />
            <stop offset="1" stopColor="#4f93ff" />
          </linearGradient>
          <radialGradient id="logo-orb" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#0c1730" />
            <stop offset="1" stopColor="#091f43" />
          </radialGradient>
        </defs>

        {/* Soft halo */}
        <circle cx="20" cy="20" r="19" fill="url(#logo-orb)" stroke="rgba(255,255,255,0.18)" />

        {/* Stethoscope */}
        <g fill="none" stroke="url(#logo-grad)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
          {/* Tubes */}
          <path d="M11 9 v6 a5 5 0 0 0 10 0 v-6" />
          {/* Earpieces */}
          <circle cx="11" cy="9" r="1.6" fill="url(#logo-grad)" stroke="none" />
          <circle cx="21" cy="9" r="1.6" fill="url(#logo-grad)" stroke="none" />
          {/* Drop tube */}
          <path d="M16 20 v6 a4 4 0 0 0 8 0" />
          {/* Bell */}
          <circle cx="27" cy="26" r="4" fill="rgba(62,224,196,0.18)" />
          <circle cx="27" cy="26" r="1.6" fill="url(#logo-grad)" stroke="none" />
        </g>
      </svg>

      <span className="font-display text-[15px] tracking-tight">
        Divine <span className="text-white/65">Psychiatry</span>
      </span>
      <span className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal-400/15 text-teal-400 font-serif leading-none text-sm" aria-hidden>℞</span>
    </span>
  );
}
