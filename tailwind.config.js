/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#9500ff',
          'purple-dark': '#5f00ba',
          lavender: '#dccbff',
          black: '#000000',
          white: '#ffffff',
        }
      },
      fontFamily: {
        heading: ['Yeseva One', 'serif'],
        body: ['Josefin Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
