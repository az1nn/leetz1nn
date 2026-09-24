/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        canvas: '#09090b',
        panel: '#111113',
        line: '#27272a',
        ink: '#fafafa',
        muted: '#a1a1aa',
        accent: '#a3e635',
      },
    },
  },
  plugins: [],
};
