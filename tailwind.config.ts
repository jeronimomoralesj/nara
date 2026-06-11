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
        // Neutral foundation
        alabaster: "#FAFAFA",
        charcoal: {
          DEFAULT: "#1A1A1A",
          soft: "#2B2B2B",
          muted: "#52525B",
        },
        // Single warm premium accent — sophisticated terracotta
        terracotta: {
          50: "#FBF4F0",
          100: "#F4E2D7",
          200: "#E7C3AE",
          300: "#D9A084",
          400: "#C97D5B",
          500: "#B85C38", // primary accent
          600: "#9E4A2C",
          700: "#7E3A23",
          800: "#5E2C1B",
          900: "#3F1E13",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
