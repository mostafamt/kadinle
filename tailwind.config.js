/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ...colors,
        primary: "#E264AD",
        "primary-gray": "#adb0b4",
        "primary-light": "#f6cfe5",
        opink: "#E264AD",
        lpink: "#f6cfe5",
        ogray: "#E264AD",
        tgray: "#707070",
        dblue: "#47b0c1",
        bgray: "#F5F6F8",
        fgray: "#eeeeee;",
        owhite: "#FFFFFF",
        secondary: "#727C8E",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};
