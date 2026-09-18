/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#0a0a0a',
        'luxury-cream': '#f9f6f0',
        'luxury-gold': '#d4af37',
        'luxury-gray': '#1f1f1f',
        'luxury-muted': '#a09d95',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-out forwards',
        'ken-burns': 'ken-burns 25s ease-in-out infinite alternate',
        'cinematic-video': 'cinematic-video 32s ease-in-out infinite alternate',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.0) translate(0, 0)' },
          '100%': { transform: 'scale(1.06) translate(-1%, -1%)' },
        },
        'cinematic-video': {
          '0%': { transform: 'scale(1.15) translate(0%, 0%)' },
          '25%': { transform: 'scale(1.15) translate(-1.5%, 0.5%)' },
          '50%': { transform: 'scale(1.18) translate(1%, -1.5%)' },
          '75%': { transform: 'scale(1.15) translate(0.5%, 1.5%)' },
          '100%': { transform: 'scale(1.15) translate(0%, 0%)' },
        }
      }
    },
  },
  plugins: [],
}
