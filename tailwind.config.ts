import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cool neutral foundation
        alabaster: "#FAFBFC",
        cream: "#F7F9FC",
        sand: "#EEF1F7",
        charcoal: {
          DEFAULT: "#16181D",
          soft: "#262A32",
          muted: "#5E636E",
        },
        // Brand accent — cornflower blue matching the Nara logo
        blue: {
          50: "#EEF5FC",
          100: "#D5E7F6",
          200: "#AACEED",
          300: "#7AB3E2",
          400: "#5299D5",
          500: "#4A8FCC",
          600: "#2E73B0",
          700: "#1F5A8F",
          800: "#154470",
          900: "#0D2E50",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        content: "1240px",
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
