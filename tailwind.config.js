/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          green: '#8CC63F',
          greenDk: '#6FA030',
          greenLt: '#A3D340',
          white: '#FFFFFF',
          gray: '#1F1F1F',
          grayLt: '#2A2A2A',
          muted: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}

