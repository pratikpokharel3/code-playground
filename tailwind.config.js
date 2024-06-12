/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   primary: "#dfdfdf"
    // },
    fontFamily: {
      sans: ["Roboto", "sans-serif"]
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
