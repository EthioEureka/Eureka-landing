import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "eureka-blue": "#2563EB",
        "eureka-blue-dark": "#1D4ED8",
        "eureka-blue-light": "#60A5FA",
        "eureka-indigo": "#4F46E5",
        "eureka-dark": "#0F172A",
        "eureka-slate": "#475569",
        "eureka-muted": "#64748B",
        "eureka-light": "#F8FAFC",
        "eureka-card": "#FFFFFF",
        "eureka-border": "#E2E8F0",
        "eureka-border-hover": "#CBD5E1",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      boxShadow: {
        "eureka-sm": "0 1px 3px 0 rgba(15, 23, 42, 0.05)",
        "eureka-md": "0 4px 12px -2px rgba(15, 23, 42, 0.08)",
        "eureka-lg": "0 12px 30px -4px rgba(37, 99, 235, 0.12)",
        "eureka-glow": "0 0 25px 0 rgba(37, 99, 235, 0.25)",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

