/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:      ['Poppins', 'system-ui', 'sans-serif'],
        serif:     ['"Playfair Display"', 'Georgia', 'serif'],
        heading:   ['"Playfair Display"', 'Georgia', 'serif'],
        body:      ['Poppins', 'system-ui', 'sans-serif'],
        hindi:     ['Hind', 'sans-serif'],
        /* Legacy aliases — remapped so existing font-cinzel / font-montserrat / font-script classes still work */
        cinzel:    ['Poppins', 'system-ui', 'sans-serif'],
        montserrat:['Poppins', 'system-ui', 'sans-serif'],
        script:    ['"Playfair Display"', 'Georgia', 'serif'],
        mono:      ['ui-monospace', 'monospace'],
      },
      colors: {
        /* Dark backgrounds — navbar, footer, hero */
        cosmic: {
          950: '#0D0A07',
          900: '#F8F9FB',   /* main section bg */
          800: '#EFF1F5',   /* alternate section bg */
          700: '#E5E7EB',
          600: '#D1D5DB',
        },
        /* Blue — nav, footer, hero dark backgrounds */
        nebula: {
          900: '#001D48',
          800: '#002D60',
          700: '#003D78',
          600: '#004E90',   /* primary blue dark */
          500: '#005EA8',   /* PRIMARY */
          400: '#3387D3',
          300: '#66A5DE',
        },
        royal: {
          50:  '#e6f0f9',
          100: '#cce1f4',
          200: '#99c3e9',
          300: '#66a5de',
          400: '#3387d3',
          500: '#005EA8',
          600: '#004E90',
          700: '#003D78',
          800: '#002D60',
          900: '#001D48',
        },
        /* Amber / secondary — CTAs, accents */
        gold: {
          200: '#FBE7C7',
          300: '#F3B757',
          350: '#E09A30',
          400: '#D88A22',   /* SECONDARY */
          500: '#B87018',
          600: '#9A5E14',
          700: '#7D4C10',
        },
        /* Neutral backgrounds */
        warm: {
          50:  '#F8F9FB',   /* BACKGROUND */
          100: '#EFF1F5',
          200: '#E5E7EB',   /* LIGHT GRAY */
          300: '#D1D5DB',
          400: '#C0C4CB',
        },
        /* Dark text scale */
        ink: {
          900: '#1A202C',   /* DARK TEXT — deeper, more authority */
          800: '#2D3748',
          700: '#4A5568',
          600: '#5A6475',   /* medium secondary text */
          500: '#6B7280',   /* subtext — shifted darker for readability */
          400: '#9CA3AF',   /* subtle labels / placeholders */
          300: '#D1D5DB',
          200: '#F3F4F6',
        },
        /* Red accent */
        accent: {
          50:  '#fce8e8',
          100: '#f9d1d1',
          200: '#f3a3a3',
          300: '#ed7575',
          400: '#e74747',
          500: '#C62828',   /* ACCENT */
          600: '#a82222',
          700: '#8a1c1c',
        },
        cta: {
          400: '#3387D3',
          500: '#005EA8',
          600: '#004E90',
          700: '#003D78',
        },
        starlight: {
          DEFAULT: '#F3B757',
          dim:     '#D88A22',
          bright:  '#FBE7C7',
        },
        charcoal: {
          DEFAULT: '#333333',
          muted:   '#555555',
        },
        section: '#F8F9FB',
      },
      boxShadow: {
        premium:      '0 4px 24px -4px rgba(216, 138, 34, 0.15), 0 1px 3px rgba(0,0,0,0.08)',
        cosmic:       '0 0 0 1px rgba(216, 138, 34, 0.15), 0 8px 24px -4px rgba(0, 94, 168, 0.12)',
        'gold-glow':  '0 0 30px rgba(216, 138, 34, 0.4), 0 0 60px rgba(216, 138, 34, 0.12)',
        'nebula-glow':'0 0 30px rgba(0, 94, 168, 0.4)',
        'card-hover': '0 0 0 1px rgba(216, 138, 34, 0.2), 0 8px 32px -4px rgba(0, 0, 0, 0.1)',
        'card':       '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px -2px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
