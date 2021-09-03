const twColors = require('tailwindcss/colors');

const colors = {
  // Grays
  black: '#161919',
  transparent: '#00000033',
  invisible: '#00000000',
  white: twColors.white,
  grey: {
    DEFAULT: '#454545',
    dark: '#292929',
    darker: '#1D1D1D',
    light: '#B4B4B4',
    lighter: '#CACACA',
    background: '#E2E2E2',
    'over-background': '#F3F4F6',
  },
  // Colors
  green: {
    DEFAULT: '#64BC46',
    dark: '#57A446',
    light: '#B3D44C',
  },
  yellow: {
    DEFAULT: '#FFC709',
    dark: '#FCB215',
    light: '#FFD766',
  },
  'yellow-orange': {
    DEFAULT: '#F7941D',
    dark: '#F57E20',
    light: '#FCB215',
  },
  orange: {
    DEFAULT: '#F15A3B',
    dark: '#DF3E2C',
    light: '#F57E20',
  },
  red: {
    DEFAULT: '#ED184A',
    dark: '#D11E45',
  },
  magenta: {
    DEFAULT: '#ED2384',
    dark: '#D31579',
    light: '#F171A4',
  },
  purple: {
    DEFAULT: '#7E3C96',
    dark: '#6B2D82',
  },
  blue: {
    DEFAULT: '#4055A4',
    dark: '#183260',
  },
};

// Synonymous Colors (adds verbosity for spelling and ease of memory)
colors.gray = colors.grey;
colors.pink = colors.magenta;
colors.fuchsia = colors.magenta;

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      boxShadow: {
        'fill-green': `inset 1000px 0 0 0 ${colors.green.DEFAULT}`,
        'fill-pink': `inset 1000px 0 0 0 ${colors.pink.DEFAULT}`,
        'fill-pink-dark': `inset 1000px 0 0 0 ${colors.pink.dark}`,
      },
    },
    colors,
    fontFamily: {
      mono: ['Rajdhani', 'monospace'],
      sans: 'PT Sans',
      italic: 'Bitter',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
