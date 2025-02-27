/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        fredoka: ["Fredoka", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        anton: ["Anton", "sans-serif"],
      },
      animation: {
        bounce: 'bounce 0.5s ease-in-out infinite alternate',
        step: 'step 1s ease-in-out infinite',
      },
      keyframes: {
        bounce: {
          '0%': {
            transform: 'scale(1, 0.7)',
          },
          '40%': {
            transform: 'scale(0.8, 1.2)',
          },
          '60%': {
            transform: 'scale(1, 1)',
          },
          '100%': {
            bottom: '140px',
          },
        },
        step: {
          '0%': {
            boxShadow: '0 10px 0 rgba(0, 0, 0, 0), 0 10px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 90px 0 #f2f2f2',
          },
          '100%': {
            boxShadow: '0 10px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 90px 0 #f2f2f2, -70px 90px 0 rgba(0, 0, 0, 0)',
          },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
