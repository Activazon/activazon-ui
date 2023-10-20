import type { Config } from "tailwindcss";

const config: Config = {
  prefix: "tw-",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-light": "#06d0f9",
        "blue-light-2": "#E8FAFF",
        "blue-dark": "#0b2442",
        "gray-dark": "#6d6d7f",
      },
      fontFamily: {
        pixellari: ["TT-Supermolot-Neue", "sans-serif"],
      },
      height: {
        "search-bar": "3.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
