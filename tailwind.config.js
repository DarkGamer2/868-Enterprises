// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", 'sans-serif'],
        inter: ['Inter'],
        bebasNeue: ['Bebas Neue'],
        lato: ['Lato']
      },
    },
  },
  plugins: [],
}
