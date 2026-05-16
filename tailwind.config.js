/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        /** Hero headline — Remove Uncertainty… */
        display: ['Michroma', 'Audiowide', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
        michroma: ['Michroma', 'sans-serif'],
        playwrite: ['"Playwrite GB S"', 'cursive'],
        lubrifont: ['"WDXL Lubrifont TC"', 'sans-serif'],
        mono: ['"Iosevka Charon Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        /** Deep navy — hero, footer, dark sections (reference ~#004A7C / #003366) */
        royal: {
          50: '#e8f4fa',
          100: '#d1e8f5',
          200: '#a8d4ea',
          300: '#7ab8d9',
          400: '#4596c4',
          500: '#1a7aad',
          600: '#0d6494',
          700: '#085580',
          800: '#004A7C',
          900: '#003366',
        },
        /** Brand gold / muted tan (reference ~#C5A059) */
        gold: {
          300: '#dcc68a',
          400: '#C5A059',
          500: '#b08d4a',
          600: '#96773e',
          700: '#7d6234',
        },
        /** Primary action — sky blue CTAs (reference ~#29ABE2) */
        cta: {
          400: '#4db8e8',
          500: '#29ABE2',
          600: '#0099FF',
          700: '#0088e6',
        },
        /** Body copy on light surfaces */
        charcoal: {
          DEFAULT: '#333333',
          muted: '#555555',
        },
        /** Muted section wash */
        section: '#F4F4F4',
      },
      boxShadow: {
        premium: '0 20px 50px -12px rgba(0, 51, 102, 0.22)',
      },
    },
  },
  plugins: [],
};
