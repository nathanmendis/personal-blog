import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glass: {
          dark: '#c8cdd6',       /* page base — noticeably darker grey */
          card: '#d4d8e0',       /* section stripes / footer */
          stroke: '#adb5c2',     /* borders */
          backdrop: 'rgba(200, 205, 214, 0.93)', /* scrolled navbar */
          light: '#dde1e8',      /* input/form fields, tag pills */
          'card-light': '#d4d8e0',
          'stroke-light': '#adb5c2',
          surface: '#f4f6f8',    /* cards/panels — light but NOT pure white, sits above the darker base */
        },
        primary: {
          DEFAULT: '#03AED2',
          light: '#53d7f5',
          dark: '#028ba8',
        },
        secondary: '#0f172a',
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
  plugins: [
    typography,
  ],
}
