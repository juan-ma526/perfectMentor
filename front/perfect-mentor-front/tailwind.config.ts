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
        "principal-1": "#bfd732",
        "principal-2": "#f5f6f7",
        "principal-3": "#444444",
        "principal-4": "#666666",
        "secundario-1": "#e61587", //Rosa fuerte
        "secundario-2": "#39b54a", // Verde Fuerte
        "secundario-3": "#DADADA",
        "secundario-4": "#E61587", // Rosa claro
        "secundario-5": "#39B54A", // Verde claro
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
