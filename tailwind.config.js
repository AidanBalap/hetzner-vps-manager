/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  
  theme: {
    extend: {
      colors: {
        'main': {
          '50': '#f4f7fb',
          '100': '#e9eef5',
          '200': '#cddbea',
          '300': '#a1bdd8',
          '400': '#6e9bc2',
          '500': '#4c7eab',
          '600': '#3a658f',
          '700': '#305174',
          '800': '#2b4561',
          '900': '#283c52',
          '950': '#202f42',
        },
      }
    },
  },
  plugins: [],
}

