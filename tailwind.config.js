/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/**/*.html", "./index.html"],
  theme: {
    extend: {
      colors: {
        primaryText: {
          100: "#1F2937",
        },
        200: "#9CA3AF",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "serif"],
      },
    },
  },
  plugins: [],
};
