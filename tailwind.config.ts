import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Includes pages and components inside app directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // If you add a components folder in src
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Includes pages outside src/app (like API routes)
    "./public/**/*.{html}", // For any HTML files in public
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tealDark: {
          50: '#e6f7f7',   // Lightest shade (tealDark and customBeige are not working)
          100: '#cceeee',
          200: '#99dddd',
          300: '#66cccc',
          400: '#33bbbb',
          500: '#0c3d3d',   // Default shade
          600: '#0a3535',
          700: '#082c2c',
          800: '#062424',
          900: '#041b1b',   // Darkest shade
        },  
        customBeige: {
          50: 'rgb(240, 240, 230)',
          100: 'rgb(245, 243, 227)',
          200: 'rgb(219, 217, 203)',
          300: 'rgb(192, 190, 178)',
          400: 'rgb(165, 164, 153)',
          500: 'rgb(138, 137, 128)',
          600: 'rgb(111, 111, 102)',
          700: 'rgb(84, 84, 77)',
          800: 'rgb(58, 58, 51)',
          900: 'rgb(31, 31, 26)',
        },
        customOrange: {
          50: '#fff8f1',
          100: '#fee6da',
          200: '#fecdad',
          300: '#fba879',
          400: '#f57c38',
          500: '#d94e1f', // Default
          600: '#b83816',
          700: '#962a12',
          800: '#772110',
          900: '#5c1b0e',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;