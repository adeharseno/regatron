import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004095",
        "primary-container": "#0156c3",
        "dark-navy": "#001944",
        "surface-bright": "#f7f9fb",
        "surface-container-low": "#f2f4f6",
        "on-surface": "#191c1e",
        "on-surface-variant": "#424653",
        outline: "#737785",
        "outline-variant": "#c2c6d5",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;