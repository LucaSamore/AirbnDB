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
        'dark-mode-2': '#252526',
        'dark-mode-3': '#2d2d30',
        'dark-mode-4': '3e3e42'
      },
    },
  },
  plugins: [require("daisyui")],
}
