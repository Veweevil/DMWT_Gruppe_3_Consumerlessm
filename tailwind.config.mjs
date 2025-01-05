/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'trash-hand': ['"Trash Hand"', 'cursive'], // Trash Hand Schriftart
        'anonymous-pro': ['"Anonymous Pro"', 'monospace'], // Anonymous Pro Schriftart
      },
    },
  },
  plugins: [],
};