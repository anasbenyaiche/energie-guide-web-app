/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bgstep': "url('/src/assets/green_step.png')"
      },
      colors: {
        'primary-title': '#1E1C1C',
        'secondary-title': '#393939',
        'primary-text': '#0D335F'
      },
      backgroundColor: {
        'bg-btn': '#011A48',
        'bg-secondary': '#E8F0FE'
      }
    },
  },
  plugins: [],
};
