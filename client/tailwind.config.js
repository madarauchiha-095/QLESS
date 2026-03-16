/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0a1929',
        'teal': '#00d4ff',
        'teal-dark': '#00a8cc',
      },
    },
  },
  plugins: [],
}
