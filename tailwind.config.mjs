/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1c1917",   // deep charcoal
          light: "#292524",
          muted: "#57534e",
        },
        cream: {
          DEFAULT: "#faf7f2",   // warm off-white
          dark: "#f0ebe3",
        },
        gold: {
          DEFAULT: "#c8a96e",   // warm gold
          light: "#dfc28f",
          dark: "#a8883e",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
