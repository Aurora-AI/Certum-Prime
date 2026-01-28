import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "dark-base": "var(--color-dark-base)",
        "light-base": "var(--color-light-base)",
        "light-card": "var(--color-light-card)",
        "border-subtle": "var(--color-border-subtle)",
        void: "var(--color-void)",
        "void-depth": "var(--color-void-depth)",
        "antique-gold": "var(--color-antique-gold)",
        "gold-dim": "var(--color-gold-dim)",
        platinum: "var(--color-platinum)",
        "platinum-mist": "var(--color-platinum-mist)",
        "platinum-dim": "var(--color-platinum-dim)",
        obsidian: "var(--color-obsidian)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        hero: "var(--font-size-hero)",
        xl: "var(--font-size-xl)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
