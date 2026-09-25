/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        lime: {
          500: '#a3e635',
          600: '#84cc16',
        },
        warm: {
          50: '#fff7ed',
          500: '#f59e0b',
          600: '#d97706',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
        surface: {
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          800: '#292524',
          900: '#1c1917',
        },
      },
      boxShadow: {
        soft: '0 20px 45px -24px rgba(15, 23, 42, 0.18)',
        glow: '0 14px 30px rgba(16, 185, 129, 0.18)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 20%, #f8fafc 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
