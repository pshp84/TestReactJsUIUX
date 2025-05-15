/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FFF5F7",
          100: "#FFE6EB",
          200: "#FFD6E0",
          300: "#FFB3C7",
          400: "#FF8CAF",
          500: "#FF6696",
          600: "#EF4573",
          700: "#CC2653",
          800: "#9B1B3F",
          900: "#6B1430",
        },
        lavender: {
          50: "#F5F4FF",
          100: "#E6E6FA",
          200: "#D4D1F8",
          300: "#B6B2F3",
          400: "#9793EE",
          500: "#7B75E8",
          600: "#5F58C6",
          700: "#4A4497",
          800: "#383265",
          900: "#292447",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
