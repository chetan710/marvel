/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import lineClamp from '@tailwindcss/line-clamp';

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      filter: {
        'grayscale': 'grayscale(1)',
        'brightness-40': 'brightness(0.4)',
      },
      boxShadow: {
        '2px-2px': '2px 2px',
      },
      colors: {
        background: '#000000',
        primary: '#F0141E',
        secondory: '#6D6A5E',
        hover: '#131313',
        purple: '#2C002D',
        black: {
          DEFAULT: '#131313',
          100: '#2C3539'
        }
      },
    },
  },
  plugins: [daisyui, lineClamp, function ({ addUtilities }) {
    const newUtilities = {
      '.filter-grayscale': {
        filter: 'grayscale(1)',
      },
      '.filter-brightness-40': {
        filter: 'brightness(0.4)',
      },
    };

    addUtilities(newUtilities, ['responsive', 'hover']);
  }, ],
}

