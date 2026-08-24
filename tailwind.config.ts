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
        "deep-black": "#0A0A0A",
        "off-white": "#F5F3EE",
        "soft-gray": "#B7B7B2",
        "dark-gray": "#181818",
        "border-gray": "#2B2B2B",
        "eureka-green": "#B8FF3D",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
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
