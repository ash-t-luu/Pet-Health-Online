/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{html, js, jsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4a5b3f",
          "secondary": "#acbda1",
          "accent": "#283106",
          "neutral": "#e7e5e4",
          "base-100": "#f5f5f4",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ]
  },
  plugins: [require('daisyui')],
}

