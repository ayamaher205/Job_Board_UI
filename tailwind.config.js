/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  content: ['./vueform.config.js', // or where `vueform.config.js` is located
  './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
  './node_modules/@vueform/vueform/themes/tailwind/**/*.js',],
  theme: {
    extend: {},
  },
  plugins: [],
  
}

