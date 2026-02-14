/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f0',
          100: '#f9edda',
          200: '#f0d5a8',
          300: '#e6b76e',
          400: '#d4a843',
          500: '#b8922e',
          600: '#9a7624',
          700: '#7a5d1c',
        },
        surface: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#f8f1e6',
          300: '#f0e6d4',
          400: '#e5d5bd',
        },
        ink: {
          900: '#2c1810',
          800: '#3d2b1f',
          700: '#5a4234',
          600: '#7a6050',
          500: '#9a8070',
          400: '#b8a898',
          300: '#d4c8b8',
        },
        accent: {
          red: '#c0392b',
          jade: '#1a8a6a',
          blue: '#2e6da4',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
