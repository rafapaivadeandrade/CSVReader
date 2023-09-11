/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        home_page: '#1A1A1A',
        main_color: '#E1FADC',
        stone: '#004132',
        ton: '#C8FFC8',
        secondary_color: '#34C457',
      },
      colors: {
        home_page: '#1A1A1A',
        main_color: '#E1FADC',
        stone: '#004132',
        ton: '#C8FFC8',
        secondary_color: '#34C457',
      },
    },
    screens: {
      // DESKTOP 1280px - 1366px - 1920px
      // => @media (max-width: 1279px) { ... }
      // TABLET 768px - 834px - 1279px
      md: { max: '1279px' },

      // => @media (max-width: 767px) { ... }
      // MOBILE 320px - 430px - 767px
      sm: { max: '767px' },
    },
  },
  plugins: [],
}
