/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#f0c674',
          500: '#d4a843',
          600: '#b8922e',
        },
        cream: '#f5f0e8',
        darkbg: {
          900: '#0a0a1a',
          800: '#121230',
          700: '#1a1a3e',
        },
        jade: '#2d8b70',
      },
      fontFamily: {
        serif: ['"Noto Serif KR"', 'Georgia', 'serif'],
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'count-up': 'countUp 1.5s ease-out forwards',
        'bar-fill': 'barFill 1s ease-out forwards',
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
        countUp: {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: 'var(--target-offset)' },
        },
        barFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width)' },
        },
      },
    },
  },
  plugins: [],
}
