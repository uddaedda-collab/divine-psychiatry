import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"]
      },
      colors: {
        ink: {
          950: "#04070d",
          900: "#080c16",
          800: "#0c1322",
          700: "#121a2c"
        },
        brand: {
          50: "#eef6ff",
          100: "#d8eaff",
          200: "#b4d4ff",
          300: "#83b7ff",
          400: "#4f93ff",
          500: "#2470f0",
          600: "#1656c8",
          700: "#10448f",
          800: "#0c2f63",
          900: "#091f43"
        },
        teal: {
          400: "#3ee0c4",
          500: "#15c2a3",
          600: "#0fa389"
        },
        gold: {
          400: "#e9c87a",
          500: "#d4ac4a"
        }
      },
      boxShadow: {
        glass:
          "0 1px 0 rgba(255,255,255,0.12) inset, 0 -1px 0 rgba(255,255,255,0.04) inset, 0 30px 60px -20px rgba(0,0,0,0.55), 0 8px 24px -10px rgba(0,0,0,0.5)",
        glow: "0 0 60px -10px rgba(62,224,196,0.35), 0 0 120px -20px rgba(36,112,240,0.35)"
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"
      },
      keyframes: {
        floatY: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" }
        },
        floatA: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(var(--r,0deg))" },
          "50%": { transform: "translate3d(0,-14px,0) rotate(calc(var(--r,0deg) + 6deg))" }
        },
        floatB: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(var(--r,0deg))" },
          "50%": { transform: "translate3d(10px,-8px,0) rotate(calc(var(--r,0deg) - 5deg))" }
        },
        floatC: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(var(--r,0deg))" },
          "33%": { transform: "translate3d(-8px,-12px,0) rotate(calc(var(--r,0deg) + 4deg))" },
          "66%": { transform: "translate3d(8px,-6px,0) rotate(calc(var(--r,0deg) - 3deg))" }
        },
        pulseDash: {
          "0%": { strokeDashoffset: "300" },
          "100%": { strokeDashoffset: "0" }
        },
        glowSoft: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "0.95" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        floatY: "floatY 7s ease-in-out infinite",
        floatA: "floatA 9s ease-in-out infinite",
        floatB: "floatB 11s ease-in-out infinite",
        floatC: "floatC 13s ease-in-out infinite",
        pulseDash: "pulseDash 6s linear infinite",
        glowSoft: "glowSoft 4.5s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        slowSpin: "slowSpin 60s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
