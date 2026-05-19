/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        display: ['Cinzel', 'Michroma', 'Audiowide', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        michroma: ['Michroma', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
        playwrite: ['"Playwrite GB S"', 'cursive'],
        mono: ['"Iosevka Charon Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        /* Dark backgrounds — navbar, footer, hero */
        cosmic: {
          950: '#0D0A07',
          900: '#FFF8F2',   /* warm cream — main section bg */
          800: '#FFF2E8',   /* alternate section bg */
          700: '#FFEBD8',
          600: '#FFE4CC',
        },
        /* Teal — nav, footer, dark accents */
        nebula: {
          900: '#062E3C',
          800: '#084557',
          700: '#0A5872',
          600: '#0C5F78',   /* primary teal */
          500: '#1A8FB0',
          400: '#4DC3E0',
          300: '#7DD5E8',
        },
        royal: {
          50:  '#e6f5f9',
          100: '#cceaf4',
          200: '#99d5ea',
          300: '#66bfdf',
          400: '#33aad4',
          500: '#1A8FB0',
          600: '#0C5F78',
          700: '#084557',
          800: '#062E3C',
          900: '#031C25',
        },
        /* Orange / saffron — primary accent, CTAs */
        gold: {
          200: '#ffe4bc',
          300: '#ffb36a',
          350: '#f59640',
          400: '#e07210',   /* primary orange — matches reference */
          500: '#c05e0d',
          600: '#a04a0a',
          700: '#7d3a08',
        },
        /* Warm cream backgrounds */
        warm: {
          50:  '#FFF8F2',
          100: '#FFF2E8',
          200: '#FFEBD8',
          300: '#FFE4CC',
          400: '#FFD4A8',
        },
        /* Dark text scale */
        ink: {
          900: '#1C1C2E',
          800: '#2D2D3A',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
          300: '#D1D5DB',
          200: '#E5E7EB',
        },
        cta: {
          400: '#4DC3E0',
          500: '#1A8FB0',
          600: '#0C5F78',
          700: '#084557',
        },
        starlight: {
          DEFAULT: '#ffd4a0',
          dim:     '#d4956a',
          bright:  '#ffe4bc',
        },
        charcoal: {
          DEFAULT: '#333333',
          muted:   '#555555',
        },
        section: '#FFF8F2',
      },
      boxShadow: {
        premium:      '0 4px 24px -4px rgba(224, 114, 16, 0.15), 0 1px 3px rgba(0,0,0,0.08)',
        cosmic:       '0 0 0 1px rgba(224, 114, 16, 0.15), 0 8px 24px -4px rgba(12, 95, 120, 0.12)',
        'gold-glow':  '0 0 30px rgba(224, 114, 16, 0.4), 0 0 60px rgba(224, 114, 16, 0.12)',
        'nebula-glow':'0 0 30px rgba(12, 95, 120, 0.4)',
        'card-hover': '0 0 0 1px rgba(224, 114, 16, 0.2), 0 8px 32px -4px rgba(0, 0, 0, 0.1)',
        'card':       '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px -2px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
