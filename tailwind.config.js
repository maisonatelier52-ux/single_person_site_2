/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { paper: "#EBE9E5", ink: "#0B0B0B" },
      fontFamily: { serif: ["var(--font-serif)", "Georgia", "serif"], sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"] },
    },
  },
  plugins: [],
};
