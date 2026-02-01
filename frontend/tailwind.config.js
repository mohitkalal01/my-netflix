/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#E50914',
        'brand-black': '#141414',
        'brand-dark': '#181818',
        'brand-light': '#F5F5F1',
        'brand-gray': '#808080',
      },
      fontFamily: {
        sans: ['"Netflix Sans"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        'black-transparent': ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)'],
      },
    },
  },
  plugins: [
    scrollbarHide
  ],
}