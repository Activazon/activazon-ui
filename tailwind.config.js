/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-bright": "#06d0f9",
        "blue-bright-trans": "#E8FAFF",
        "blue-dark": "#0b2442",
        "gray-dark": "#6d6d7f",
      },
    },
  },
  plugins: [],
};
