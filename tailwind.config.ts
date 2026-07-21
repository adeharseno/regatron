import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0156C3",       // Biru Utama (Regatron Light Blue)
          navy: "#012351",       // Biru Tua / Accent Background
          dark: "#0A0F1D",       // Background Mode Gelap
          light: "#F8FAFC",      // Background Terang
          gray: "#64748B",       // Teks Subtitle / Secondary
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;