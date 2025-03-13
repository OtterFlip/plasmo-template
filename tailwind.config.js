/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  // Add debug logging
  logging: {
    level: 'debug',
    content: true
  }
}
