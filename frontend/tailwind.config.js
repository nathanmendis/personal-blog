/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        valorant: {
          red: '#FF4655',
          dark: '#0F1923',
          light: '#ECE8E1',
          gray: '#5a6e7f' // Added a softer gray for accents
        }
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        special: ['Teko', 'sans-serif'] // For tactical numbers/details
      }
    },
  },
  plugins: [],
}
