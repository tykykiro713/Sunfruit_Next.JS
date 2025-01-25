/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limegreen: {
          50: '#f7fce5',
          100: '#eef8cc',
          200: '#dcef99',
          300: '#cae666',
          400: '#b8dd33',
          500: '#cddd00', // Base color
          600: '#a4b200',
          700: '#7b8600',
          800: '#525a00',
          900: '#292d00',
        },
        darkteal: {
          50: '#e5f6f6',
          100: '#cceeee',
          200: '#99dddd',
          300: '#66cccc',
          400: '#33baba',
          500: '#0d3d3d', // Base color
          600: '#0b3535',
          700: '#092c2c',
          800: '#072424',
          900: '#041414',
        },
        brightgreen: {
          50: '#e7f9e7',
          100: '#cef3ce',
          200: '#9eeb9e',
          300: '#6fe36f',
          400: '#46db46',
          500: '#46de46', // Base color
          600: '#3dbf3d',
          700: '#34a034',
          800: '#2a802a',
          900: '#1c551c',
        },
        customYellow: {
          50: '#fdfbe2', // Lightest tint
          100: '#fbf6c5', 
          200: '#f7ec94',
          300: '#f3e366',
          400: '#f3da4c',
          500: '#f3e14c', // Base color
          600: '#d2c244',
          700: '#a39b35',
          800: '#746d26',
          900: '#464716', // Darkest shade
        },
        custombeige: {
          100: '#FBFBFA',
          200: '#F9F8F5',
          300: '#F7F6F2',
          400: '#F6F5F0',
          500: '#F6F5F0', // Default
          600: '#D6D4C8',
          700: '#B6B4A0',
          800: '#969478',
          900: '#767450',
        },
        orange: {
          50: '#FFEDE3',   // Very light
          100: '#FFD9B7',
          200: '#FFC08D',
          300: '#FFA865',
          400: '#FF9140',
          500: '#F86303',  // Default
          600: '#D45102',
          700: '#B04102',
          800: '#8C3201',
          900: '#682301',  // Very dark
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins as a custom font
      },
    },
  },
  experimental: {
    applyComplexClasses: true,
  },
  plugins: [],
};



