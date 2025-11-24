/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary': '#0F172A',        // Dark Navy
        'secondary': '#38BDF8',      // Sky Blue
        'surface': '#F8FAFC',        // Slate 50
      },
    },
  },
  plugins: [],
}
