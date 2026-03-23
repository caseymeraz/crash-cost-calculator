import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          surface: '#141420',
          'surface-hover': '#1C1C2E',
        },
        border: '#2A2A3C',
        'text-primary': '#F0F0F5',
        'text-secondary': '#8888A0',
        accent: {
          green: '#4ADE80',
          cyan: '#22D3EE',
          red: '#F87171',
        },
      },
      fontFamily: {
        mono: ['GeistMono', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
