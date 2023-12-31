import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue8: "#3b5bdb",
        blue3: "#74c0fc",
        gray0: "#f8f9fa",
        dark7: "#1a1b1e",
        gray7: "#495057",
        green7: "#009776",
        cprimary: "#f5b22f",
        "primary-trans": "#f5b32f2a",
        csecondary: "#ffffff",
        ctertiary: "#292929",
        "accent-blue": "#197dfd",
        "accent-blue-trans": "#197cfd18",
        "accent-red": "#f94144",
        "accent-green": "#93e409",
        "accent-green-trans": "#94e40960",
        "accent-yellow": "#fbffb7",
        "accent-black": "#f94144",
        "neutral-light": "#d9d9d9",
        "neutral-mid": "#f8f8f8",
        "neutral-dark": "#8e96a3",
        alert: "#c10a0a",
        dark: {
          blue8: "#3b5bdb",
          blue3: "#74c0fc",
          gray0: "#f8f9fa",
          dark7: "#1a1b1e",
          gray7: "#495057",
          green7: "#009776",
          cprimary: "#f5b22f",
          "primary-trans": "#f5b32f2a",
          csecondary: "#ffffff",
          ctertiary: "#292929",
          "accent-blue": "#197dfd",
          "accent-blue-trans": "#197cfd18",
          "accent-red": "#f94144",
          "accent-green": "#93e409",
          "accent-green-trans": "#94e40960",
          "accent-yellow": "#fbffb7",
          "accent-black": "#f94144",
          "neutral-light": "#d9d9d9",
          "neutral-mid": "#f8f8f8",
          "neutral-dark": "#8e96a3",
          alert: "#c10a0a",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
