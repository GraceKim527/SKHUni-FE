/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard Variable"', 'sans-serif'],
      },
      colors: {
        primary: '#512DA8',
        primaryLight: '#B39DDB',
        secondary: '#F4C430',
        secondaryLight: '#FCE38A',
        gray050: '#FAFAFA',
        gray100: '#F5F5F5',
        gray200: '#E5E5E5',
        gray300: '#D4D4D4',
        gray400: '#A3A3A3',
        gray500: '#737373',
        gray600: '#525252',
        gray700: '#404040',
        gray800: '#333333',
        gray900: '#1A1A1A',
      },
    },
  },
  plugins: [],
};
