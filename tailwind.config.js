/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./models/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#111111",
      yellow: "#f5ff7e",
      blue: "#d6e2e4",
      white: "#fcfcfc",
      gray: {
        light: "#f0f0f0",
        dark: "#d0d0d0",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
