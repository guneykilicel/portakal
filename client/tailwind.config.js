/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dcdark: "#292841",
        brand: '#0095f6',
        facebook: '#385185',
        link: '#00376b',
        input: '#fafafa',
        kavun: "#00a295",
        kavunLight: "#3dcda7"
      }
    },
  },
  plugins: [],
}
