/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bordeaux: '#8B2635',
        cream: '#FAF9F7',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}