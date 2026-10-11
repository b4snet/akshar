/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        background: "#F2F2F7",
        dark: "#000000",
      },
      fontFamily: {
        sans: ["-apple-system","BlinkMacSystemFont","'Segoe UI'","Roboto","Helvetica Neue","Arial","Noto Sans","sans-serif"],
        mono: ["SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New","monospace"]
      }
    }
  },
  plugins: [],
};
