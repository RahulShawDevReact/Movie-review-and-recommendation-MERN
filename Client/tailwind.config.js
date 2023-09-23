/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors:{
        primary:"#071952"
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  }
}