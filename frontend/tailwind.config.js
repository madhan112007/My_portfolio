/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#F5EDD6',
          darker: '#EDE0C4',
        },
        ink: {
          DEFAULT: '#1A1209',
          light: '#5C4A2A',
        },
        gold: {
          DEFAULT: '#B8860B',
          bright: '#FFD700',
          faded: '#C9A84C',
        },
        leather: {
          black: '#0D0A06',
          dark: '#3D2B1F',
        }
      },
      fontFamily: {
        heading: ['"Cinzel Decorative"', 'serif'],
        subheading: ['"Playfair Display"', 'serif'],
        body: ['"EB Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      perspective: {
        '1200': '1200px',
      }
    },
  },
  plugins: [],
}
