/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0A0A1A',
        card: '#1A1A2E',
        'card-border': 'rgba(255,255,255,0.08)',
        primary: '#00D4FF',
        secondary: '#00FF88',
        accent: '#FF6B35',
        'text-secondary': '#8E8E9E',
        'bg-element': '#1A1A2E',
        'bg-selected': '#2A2A3E',
        danger: '#FF4444',
        success: '#00FF88',
        warning: '#FFD700',
      },
    },
  },
  plugins: [],
};
