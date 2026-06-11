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
        // Single premium accent — sophisticated sapphire blue
        blue: {
          50: "#EEF3FB",
          100: "#D7E3F4",
          200: "#B0C7E9",
          300: "#84A5D8",
          400: "#5681C3",
          500: "#2C5DA8",
          600: "#234C8B",
          700: "#1B3C6F",
          800: "#152D54",
          900: "#0F1F3A",
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
