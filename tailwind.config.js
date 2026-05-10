/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mmt: {
          50: '#fff0f5',
          100: '#ffe0eb',
          200: '#ffc2d7',
          300: '#ff94b5',
          400: '#ff5c8a',
          500: '#E2136E',
          600: '#D0021B',
          700: '#B8001A',
          800: '#8B0020',
          900: '#6B001D',
        },
        navy: {
          50: '#f0f3f9',
          100: '#d9e0ee',
          200: '#b3c1dd',
          300: '#8da2cc',
          400: '#536B99',
          500: '#2B3A67',
          600: '#1A2744',
          700: '#151E38',
          800: '#0F1628',
          900: '#0A0E1A',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
        'nav': '0 2px 4px rgba(0,0,0,0.08)',
        'search': '0 4px 20px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}
