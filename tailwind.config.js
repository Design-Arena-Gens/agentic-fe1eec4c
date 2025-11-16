/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        card: {
          light: '#f8fafc',
          dark: '#111827'
        }
      }
    },
  },
  plugins: [],
};
