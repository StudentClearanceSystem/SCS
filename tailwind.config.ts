import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          300: '#93c5fd',
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      fontFamily: {
        arimo: ['Arimo', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',

  plugins: [require('@tailwindcss/forms'), nextui()],
};

export default config;
