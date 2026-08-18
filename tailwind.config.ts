import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5F0',
        surface: '#FFFFFF',
        'text-primary': '#17222B',
        'text-secondary': '#58646D',
        primary: {
          DEFAULT: '#245E5D',
          hover: '#1B4B4A',
          light: '#E8F1F0',
        },
        accent: {
          DEFAULT: '#A77D46',
          hover: '#8C6734',
          light: '#F8F4ED',
        },
        border: '#DDE2E1',
        danger: {
          DEFAULT: '#A33A3A',
          light: '#FDECEC',
        },
        success: {
          DEFAULT: '#2F6B4F',
          light: '#EAF5EF',
        },
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      lineHeight: {
        persian: '1.85',
      },
    },
  },
  plugins: [],
}

export default config
