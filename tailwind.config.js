/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        royal: {
          50: '#eef2ff',
          100: '#dae3ff',
          500: '#2a4cb8',
          600: '#1e3a8a',
          700: '#15296b',
          800: '#0f1f52',
          900: '#0a1740',
        },
        gold: {
          300: '#f7d27a',
          400: '#f0bf50',
          500: '#e5a935',
          600: '#c88a1e',
        },
      },
      boxShadow: {
        premium: '0 20px 50px -12px rgba(15, 31, 82, 0.25)',
      },
    },
  },
  plugins: [],
};
