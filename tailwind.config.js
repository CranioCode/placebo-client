module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        back: "#F2FDFF",
        dark: "#26263A",
        primary: "#6EB6FF",
        secondary: "#90F2FF",
        tertiary: "#7098DA",
        quaternary: "#E0FCFF",
      },
      borderWidth: {
        3: "3px",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
    fontSize: {
      micro: ".25rem",
      tiny: ".5rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
  plugins: [],
};
