/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#cde4fa",
          200: "#9cc9f4",
          300: "#6aafef",
          400: "#3994e9",
          500: "#0779e4",
          600: "#0661b6",
          700: "#044989",
          800: "#03305b",
          900: "#01182e",
        },
      },
      backgroundImage: {
        "dashboard-bg": "url('/src/assets/images/background.jpg')",
      },
    },
  },
  plugins: [],
};
