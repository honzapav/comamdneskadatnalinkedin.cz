/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          primary: '#0A66C2',
          secondary: '#0077B5',
          background: '#F3F2EF',
        },
      },
    },
  },
  plugins: [],
}

