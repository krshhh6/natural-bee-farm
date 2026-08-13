/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#282823',
          dark: '#1C1C18',
          light: '#363630',
        },
        ebony: {
          DEFAULT: '#595C56',
          dark: '#454842',
          light: '#72766E',
        },
        sunray: {
          DEFAULT: '#E9BE5F',
          hover: '#D4AA4B',
          light: '#F2CD78',
          dark: '#C49A3C',
        },
        blond: {
          DEFAULT: '#F5E8B6',
          light: '#FAF3D6',
          dark: '#EBDC9D',
        },
        brand: {
          charcoal: '#282823',
          ebony: '#595C56',
          sunray: '#E9BE5F',
          blond: '#F5E8B6',
        },
        warm: {
          bg: '#F5E8B6',
          card: '#FAF3D6',
          darkBg: '#282823',
          darkCard: '#1C1C18',
          border: '#E9BE5F',
          accent: '#E9BE5F',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
