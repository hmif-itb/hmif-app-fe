/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        green: {
          50: '#eaeeeb',
          75: '#aab8ad',
          100: '#879a8c',
          200: '#536f5a',
          300: '#305138',
          400: '#223927',
          500: '#1d3122',
        },
        yellow: {
          50: '#fcf9f1',
          75: '#f3e8c4',
          100: '#eedeab',
          200: '#e7d087',
          300: '#e2c66f',
          400: '#9e8b4e',
          500: '#8a7944',
        },
        neutral: {
          light: '#fdfdfd',
          'light-hover': '#fcfcfc',
          'light-active': '#f9faf9',
          normal: '#ebeeeb',
          'normal-hover': '#d4d6d4',
          'normal-active': '#bcbebc',
          dark: '#b0b3b0',
          'dark-hover': '#8d8f8d',
          'dark-active': '#6a6b6a',
          darker: '#525352',
          black: '#000000',
        },
        success: {
          10: '#E8FCF1',
          20: '#A5E1BF',
          40: '#419E6A',
          60: '#00632B',
          80: '#00401C',
          100: '#002611',
        },
        info: {
          10: '#D3E1FE',
          20: '#7EA5F8',
          40: '#4D82F3',
          60: '#2563EB',
          80: '#0037B3',
          100: '#002987',
        },
        warning: {
          10: '#FFF5D5',
          20: '#FFDE81',
          40: '#EFB008',
          60: '#976400',
          80: '#724B00',
          100: '#4D2900',
        },
        error: {
          10: '#FFEBEB',
          20: '#FC9595',
          40: '#D83232',
          60: '#B01212',
          80: '#8C0000',
          100: '#660000',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        'heading-xl': ['2.25rem', { lineHeight: '2.925rem' }],
        'heading-lg': ['1.875rem', { lineHeight: '2.4375rem' }],
        'heading-md': ['1.5rem', { lineHeight: '1.95rem' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.625rem' }],
        'body-xl': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-lg': ['1rem', { lineHeight: '1.625rem' }],
        'body-md': ['0.875rem', { lineHeight: '1.25rem' }],
        'body-sm': ['0.75rem', { lineHeight: '1.25rem' }],
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
