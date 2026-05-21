/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#0057FF',
          50: '#EAF1FF',
          100: '#D6E4FF',
          600: '#0046CC',
          700: '#0037A0',
        },
        ink: {
          950: '#061126',
        },
      },
      boxShadow: {
        soft: '0 16px 40px rgba(15, 23, 42, 0.08)',
        card: '0 10px 24px rgba(15, 23, 42, 0.06)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.35s ease-out',
        'pulse-soft': 'pulseSoft 1.2s ease-in-out infinite',
        'toast-in': 'toastIn 0.25s ease-out',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(0, 87, 255, 0.28), transparent 34%), radial-gradient(circle at 75% 25%, rgba(245, 197, 24, 0.20), transparent 22%)',
      },
    },
  },
  plugins: [],
};
