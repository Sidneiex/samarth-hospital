import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050E1A",
          900: "#0A1628",
          800: "#0E2040",
          700: "#112850",
          600: "#1A3666",
        },
        gold: {
          300: "#E8CC8A",
          400: "#D4B06A",
          500: "#C9A84C",
          600: "#B8922A",
          700: "#9A7A1E",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #050E1A 0%, #0A1628 50%, #0E2040 100%)",
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #D4B06A 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
