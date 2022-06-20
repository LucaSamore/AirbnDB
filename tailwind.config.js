module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'dark-mode-2': '#252526'
      },
    },
  },
  plugins: [],
}
