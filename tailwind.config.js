/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'geron-white': '#FFFFFF',
        'geron-grey-light': '#F5F5F7',
        'geron-grey-dark': '#1A1A1A', // Graphite for text/lines
        'geron-grey-mid': '#666666', // Secondary text
        'geron-cyan': '#00FFFF', // Neon highlight
        'geron-orange': '#FF8C00', // Warm wireframe fade
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'sketch-pattern': "url('/src/assets/sketch-noise.png')", // Placeholder if needed, or CSS filter
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
