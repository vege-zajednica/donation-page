/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#db6a1c',
          100: '#db6a1c',
          200: '#db6a1c',
          300: '#db6a1c',
          400: '#db6a1c',
          500: '#db6a1c',
          600: '#db6a1c',
          700: '#db6a1c',
          800: '#db6a1c',
          900: '#db6a1c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
