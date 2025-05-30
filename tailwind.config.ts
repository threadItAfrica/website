import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        heading: ['Open Sans', 'system-ui', 'sans-serif'],
        body: ['Roboto', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: "#006838",
        secondary: "#E9C770",
        tertiary: "#005A56",
        extra: "#d7958e",
        heroBg: "#e6fae5",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow:{
        'custom': "0px 0px 20px 1px #d97706",
        'custom2': 'inset 0px 0px 30px 5px #22c55e'
      }
    },
  },
  plugins: [scrollbarHide],
} satisfies Config; 
