/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          1: '#e71462',
          2: '#ed3479',
          3: '#f35491',
          4: '#f973a8',
          5: '#ff93bf',
        },
        violet: {
          1: '#6c1cfd',
          2: '#8937fe',
          3: '#a752fe',
          4: '#c46cff',
          5: '#e187ff',
        },
        dark: {
          1: '#2b2b2b',
          2: '#3a3a3a',
          3: '#494949',
          4: '#585858',
          5: '#676767',
        },
        light: {
          1: '#f7f0f0',
          2: '#eae4e4',
          3: '#ddd8d8',
        },
        black: '#0c0c0c',
        white: '#fafafa',
        danger: '#FF4C4C',
        succes: '#4CAF50',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '999': '999',
        'max': '2147483647',
      }
    },
  },
  plugins: [],
}

