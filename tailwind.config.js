
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], 
      },
      colors: {
        brand: {
          orange: '#f97316', 
          green: '#10b981',  
          dark: '#1f2937',   
          darker: '#111827', 
        },
        'health-primary': '#0ea5e9',
        'health-secondary': '#3b82f6',
        'health-light': '#f0f9ff', 
        
        'casting-primary': '#8b5cf6',
        'casting-secondary': '#1e1b4b',
        'casting-accent': '#f472b6',
        'casting-bg': '#f3f4f6',
        'casting-card': '#ffffff',
        'casting-text-dark': '#111827',
        'casting-text-light': '#6b7280',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      boxShadow: {
          "soft": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          "card": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }
    },
  },
  plugins: [],
}
