/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--accent)',
        primaryDeep: 'var(--accent)',
        primaryLight: 'var(--accent-soft)',
        background: 'var(--bg)',
        foreground: 'var(--ink)',
        secondary: 'var(--ink-muted)',
        silver: 'var(--ink-muted)',
        card: 'var(--surface)',
        border: 'var(--border)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--danger)',
        softBlue: 'var(--accent-soft)',
        softLavender: 'var(--surface-2)',
        softMint: 'var(--accent-soft)',
        softYellow: 'var(--accent-soft)',
        rail: 'var(--rail)',
        panel: 'var(--panel)',
        physics: 'var(--physics)',
        chemistry: 'var(--chemistry)',
        mathematics: 'var(--mathematics)',
        biology: 'var(--biology)',
        english: 'var(--english)',
        nepali: 'var(--nepali)',
        cee: 'var(--cee)',
        ioe: 'var(--ioe)',
      },
      fontFamily: {
        sans: ['var(--font-akshar-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans Devanagari', 'sans-serif'],
        display: ['var(--font-akshar-display)', 'var(--font-akshar-devanagari)', 'serif'],
        mono: ["SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New","monospace"]
      }
    }
  },
  plugins: [],
};
