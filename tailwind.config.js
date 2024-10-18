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
        sans: ['Inter', 'sans-serif'], // Use 'Inter' for the default sans-serif font
        inter: ['Inter', 'sans-serif'],
        bebas: ['Bebas Neue', 'cursive'], // Bebas Neue has a cursive fallback style
        lato: ['Lato', 'sans-serif'], // Lato as another option
      },
    },
  },
  plugins: [],
}
