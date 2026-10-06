/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'bg-signal-cyan', 'bg-signal-cyan-bright', 'bg-signal-teal', 'bg-signal-lime', 'bg-signal-lime-bright',
    'text-signal-cyan', 'text-signal-teal', 'text-signal-lime', 'text-phoenix-orange',
    'border-signal-cyan', 'border-signal-teal', 'border-signal-lime', 'border-phoenix-orange',
    'bg-signal-cyan/5', 'bg-signal-cyan/10', 'bg-signal-cyan/20',
    'bg-signal-teal/5', 'bg-signal-teal/10', 'bg-signal-teal/20',
    'bg-signal-lime/5', 'bg-signal-lime/10', 'bg-signal-lime/20',
    'bg-phoenix-orange/5', 'bg-phoenix-orange/10', 'bg-phoenix-orange/20',
    'border-signal-cyan/20', 'border-signal-cyan/30', 'border-signal-cyan/40',
    'border-signal-teal/20', 'border-signal-teal/30', 'border-signal-teal/40',
    'border-signal-lime/20', 'border-signal-lime/30', 'border-signal-lime/40',
    'border-phoenix-orange/20', 'border-phoenix-orange/30', 'border-phoenix-orange/40',
    'text-signal-cyan/40', 'text-signal-cyan/60',
    'shadow-signal-cyan/20', 'shadow-signal-lime/20',
    'hover:bg-signal-cyan/5', 'hover:bg-signal-lime/5', 'hover:bg-signal-teal/5',
    'hover:border-signal-cyan/30', 'hover:border-signal-cyan/40',
    'hover:border-signal-lime/30', 'hover:border-signal-lime/40',
    'hover:border-signal-teal/30', 'hover:border-signal-teal/40',
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          50: '#1e2530',
          100: '#1a1f28',
          200: '#161b22',
          300: '#131820',
          400: '#101519',
          500: '#0d1117',
          600: '#0b0f14',
          700: '#090c10',
          800: '#07090d',
          900: '#05070a',
        },
        signal: {
          cyan: '#22d3ee',
          'cyan-bright': '#06b6d4',
          'cyan-dim': '#0e7490',
          teal: '#2dd4bf',
          'teal-bright': '#14b8a6',
          lime: '#a3e635',
          'lime-bright': '#84cc16',
          'lime-dim': '#65a30d',
        },
        phoenix: {
          orange: '#f97316',
          'orange-bright': '#fb923c',
          'orange-dim': '#c2410c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'pulse-signal': 'pulseSignal 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'stream-flow': 'streamFlow 3s linear infinite',
        'dashed-flow': 'dashedFlow 1s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'sweep': 'sweep 8s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
        'score-fill': 'scoreFill 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'count-up': 'countUp 1.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'progress-fill': 'progressFill 1s ease-out forwards',
        'wave': 'wave 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSignal: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(0%)', opacity: '0.8' },
          '50%': { opacity: '0.4' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        streamFlow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        dashedFlow: {
          '0%': { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        sweep: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        scoreFill: {
          from: { strokeDashoffset: '283' },
          to: { strokeDashoffset: 'var(--target-offset)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        countUp: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        progressFill: {
          from: { width: '0%' },
          to: { width: 'var(--target-width)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0px) scaleY(1)' },
          '50%': { transform: 'translateY(-4px) scaleY(1.1)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
