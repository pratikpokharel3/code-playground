/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e1e1e",
        secondary: "#3c3c3c"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
