/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0B0F19',
          soft: '#0F1422',
        },
        card: '#111827',
        cardSoft: '#161E2F',
        border: '#1F2937',
        accent: {
          DEFAULT: '#3B82F6',
          purple: '#8B5CF6',
        },
        profit: '#22C55E',
        loss: '#EF4444',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glow: '0 0 24px -6px rgba(59,130,246,0.45)',
        'glow-purple': '0 0 28px -6px rgba(139,92,246,0.45)',
        card: '0 4px 24px -6px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg,#3B82F6 0%,#8B5CF6 100%)',
        'glass': 'linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(59,130,246,0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in .5s ease-out both',
        shimmer: 'shimmer 1.6s infinite',
        pulseGlow: 'pulseGlow 2s infinite',
      },
    },
  },
  plugins: [],
}
