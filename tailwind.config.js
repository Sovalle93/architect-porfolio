module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'architect-primary': '#1a365d',
        'architect-secondary': '#e2e8f0',
        'architect-accent': '#f6ad55',
        // Optional: Add your new color scheme
        'sky': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1'
        }
      },
      fontFamily: {
        abril: ['var(--font-abril)', 'serif'],
        hacen: ['var(--font-hacen)', 'sans-serif'],
        league: ['var(--font-league)', 'sans-serif'],
        // Set default sans to Hacen Tunisia
        sans: ['var(--font-hacen)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}