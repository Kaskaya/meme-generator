/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom: {
          main: "#672280",
          secondary: "#A626D3",
        },
      },
    },
  },
  plugins: [],
};
