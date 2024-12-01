import twColors from 'tailwindcss/colors';
import typographyPlugin from '@tailwindcss/typography';
import scrollbarPlugin from 'tailwind-scrollbar';

import type { Config } from 'tailwindcss';

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
    border: '#DDDDDD',
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

const config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'infinite-scroll': 'scroll 120s linear infinite',
        'infinite-scroll-reverse': 'scroll-reverse 120s linear infinite',
      },
      dropShadow: {
        border: '2px 2px 4px rgba(0, 0, 0, 0.05)',
      },
      zIndex: {
        '-10': '-10',
      },
      screens: {
        '3xl': '1600px',
        '4xl': '2000px',
      },
      borderWidth: {
        16: '16px',
      },
      transitionProperty: {
        'background-position': 'background-position',
      },
    },
    colors: {
      ...colors,
      broccoli: colors.green.DEFAULT,
      banana: colors.yellow.DEFAULT,
      carrot: colors.orange.DEFAULT,
      watermelon: colors.magenta.DEFAULT,

      // Synonymous Colors (adds verbosity for spelling and ease of memory)
      gray: colors.grey,
      pink: colors.magenta,
      fuchsia: colors.magenta,
    },
    fontFamily: {
      mono: ['var(--font-rajdhani)', 'monospace'],
      sans: 'var(--font-ptsans)',
      serif: 'var(--font-bitter)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typographyPlugin, scrollbarPlugin],
} satisfies Config;

export default config;
