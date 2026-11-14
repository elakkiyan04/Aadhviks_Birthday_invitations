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
        "peacock-blue": "#174F68",
        "krishna-blue": "#17345C",
        "antique-gold": "#D5AE61",
        "ivory-cream": "#FFF8E8",
        "sky-blue": "#DCEEF4",
        "peacock-green": "#287B70",
        "gold-light": "#F7E5B5",
        "gold-dark": "#9C772F",
        "deep-night": "#0B1D2D",
        "ivory-pure": "#FFFCF5",
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "-apple-system", "sans-serif"],
        tamil: ["'Noto Serif Tamil'", "Latha", "serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FBF0D9 0%, #D5AE61 50%, #9C772F 100%)",
        "gold-shimmer": "linear-gradient(90deg, #D5AE61 0%, #FFF3D6 50%, #D5AE61 100%)",
        "krishna-radial": "radial-gradient(circle at 50% 20%, #1E5C78 0%, #17345C 55%, #0B1D2D 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(255, 248, 232, 0.96) 0%, rgba(253, 244, 222, 0.92) 100%)",
        "dark-card": "linear-gradient(180deg, rgba(23, 79, 104, 0.95) 0%, rgba(23, 52, 92, 0.95) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(213, 174, 97, 0.35)",
        "gold-glow-lg": "0 0 45px rgba(213, 174, 97, 0.5)",
        "krishna-depth": "0 20px 40px -15px rgba(11, 29, 45, 0.6)",
      },
      animation: {
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 8px rgba(213, 174, 97, 0.4))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 20px rgba(213, 174, 97, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
