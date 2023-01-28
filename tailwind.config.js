/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "easy-red": "#FF4A4A",
        "almost-easy-red": "#FF5151",
        "almost-black": "#121212",
      },
      fontFamily: {
        display: ["var(--font-calsans)", "system-ui", "sans-serif"],
        body: ["var(--font-gambetta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl": "80px",
      },
    },
  },
  plugins: [],
};
