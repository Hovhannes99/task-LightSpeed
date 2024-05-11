/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './src/atoms/**/*.{vue,js,ts,jsx,tsx}',
    './src/molecules/**/*.{vue,js,ts,jsx,tsx}',
    './src/organisms/**/*.{vue,js,ts,jsx,tsx}',
    './src/templates/**/*.{vue,js,ts,jsx,tsx}',
    './src/layout/**/*.{vue,js,ts,jsx,tsx}',
    './src/pages/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#1563b7',
        'gray-main': '#737D88',
        'accent-light': '#DAE6F1',
        red: '#E5635D',
        primary: {
          50: '#f1f7fe',
          100: '#e3edfb',
          200: '#c0daf7',
          300: '#89bdf0',
          400: '#4a9ae6',
          500: '#237dd4',
          600: '#1563b7',
          700: '#124e92',
          800: '#134379',
          900: '#153a65',
          950: '#0e2543'
        },
        'custom-green': {
          50: '#D6FFE4',
          100: '#ddf4d3',
          200: '#beebab',
          300: '#94dc7a',
          400: '#62c540',
          500: '#51af33',
          600: '#3c8b25',
          700: '#306b20',
          800: '#29551f',
          900: '#25491e',
          950: '#0f280b'
        },
        'custom-red': {
          50: '#fdf3f3',
          100: '#fce5e4',
          200: '#fad0ce',
          300: '#f6aeab',
          400: '#ee807b',
          500: '#e5635d',
          600: '#cf3a33',
          700: '#ae2d27',
          800: '#902924',
          900: '#782824',
          950: '#41100e'
        },
        'custom-gray': {
          50: '#f5f8f8',
          100: '#edf1f2',
          200: '#dfe4e6',
          300: '#cad3d7',
          400: '#b4bec5',
          500: '#a0abb4',
          600: '#8a96a1',
          700: '#737d88',
          800: '#616972',
          900: '#52585d',
          950: '#303336'
        },
        'custom-orange': {
          50: '#FFFDDC',
          100: '#fdf1c8',
          200: '#fce08b',
          300: '#faca4f',
          400: '#f8b220',
          500: '#f2930e',
          600: '#d66e09',
          700: '#b24b0b',
          800: '#903a10',
          900: '#773010',
          950: '#441704'
        }
      },
      screens: {
        lg: '992px',
        sm: '375px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ]
}
