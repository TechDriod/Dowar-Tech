/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  safelist: [
    'bg-purple-500', 'bg-cyan-400', 'bg-lime-400', 'bg-yellow-400',
    'text-purple-400', 'text-cyan-400', 'text-lime-400', 'text-yellow-400',
    'border-purple-500', 'border-cyan-400', 'border-lime-400',
    'hover:border-purple-500', 'hover:border-cyan-400',
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#b537f2',
        'neon-cyan': '#00f5ff',
        'neon-green': '#39ff14',
        'dark-900': '#0a0a0f',
        'dark-800': '#12121a',
        'dark-700': '#1a1a2e',
        'dark-600': '#16213e',
      },
      fontFamily: {
        gaming: ['Orbitron', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(181, 55, 242, 0.5)',
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.5)',
        'neon-green': '0 0 20px rgba(57, 255, 20, 0.5)',
        'neon-purple-lg': '0 0 40px rgba(181, 55, 242, 0.6)',
        'neon-cyan-lg': '0 0 40px rgba(0, 245, 255, 0.6)',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(181, 55, 242, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(181, 55, 242, 0.9), 0 0 60px rgba(181, 55, 242, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
