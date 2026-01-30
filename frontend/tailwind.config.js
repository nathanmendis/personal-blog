/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        glass: {
          // Dark Mode Defaults
          dark: '#030014', // Deep space blue/black
          card: 'rgba(255, 255, 255, 0.03)',
          stroke: 'rgba(255, 255, 255, 0.1)',
          backdrop: 'rgba(3, 0, 20, 0.7)',

          // Light Mode Equivalents (to be used with 'light:' prefix or CSS variables if preferred, 
          // but here we might just map them in CSS or use tailored classes)
          light: '#ffffff',
          'card-light': 'rgba(255, 255, 255, 0.7)',
          'stroke-light': 'rgba(0, 0, 0, 0.05)',
        },
        primary: {
          DEFAULT: '#a855f7', // Purple accent
          light: '#d8b4fe',
          dark: '#7e22ce',
        },
        secondary: '#3b82f6', // Blue accent
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      }
    },
  },
  plugins: [],
}
