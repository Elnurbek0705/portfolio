/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg-main)',
          secondary: 'var(--bg-secondary)',
          text: 'var(--text-main)',
          muted: 'var(--text-muted)',
          accent: 'var(--accent)',
        }
      }
    },
  },
  plugins: [],
}