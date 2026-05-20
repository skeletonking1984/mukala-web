import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mukala brand palette — locked
        void: "#0C0A14",
        deep: "#171225",
        agent: {
          DEFAULT: "#A24CF0",
          deep: "#6D2BD0",
        },
        operator: {
          DEFAULT: "#22D3EE",
          deep: "#1B8FB0",
        },
        gold: "#E0A93C",
        paper: "#F4F1EC",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-prowl": "linear-gradient(135deg, #22D3EE 0%, #A24CF0 100%)",
        "gradient-void": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(162,76,240,0.18), transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 2s ease-in-out infinite",
        "orb-float": "orb-float 8s ease-in-out infinite",
        "rotate-slow": "rotate 30s linear infinite",
      },
      keyframes: {
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-10px, -20px) scale(1.05)" },
        },
        rotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
