/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bgstep': "url('/src/assets/green_step.png')"
      }
    },
  },
  plugins: [],
};
