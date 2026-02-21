/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7b1a1a",
        "primary-dark": "#5a1212",
        topbar: "#1a1a2e",
      },
    },
  },
  plugins: [],
}
