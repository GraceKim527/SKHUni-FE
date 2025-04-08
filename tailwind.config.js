/** @type {import('tailwindcss').Config} */

const { require } = require('node:module');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'sans-serif'],
      },
      colors: {
        primary: '#512DA8',
        'primary-light': '#B39DDB',
        secondary: '#F4C430',
        'secondary-light': '#FCE38A',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#333333',
          900: '#1A1A1A',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
