const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    blue: "#3B4CCA",
    red: { light: "#FF0000", dark: "#CC0000" },
    yellow: "#FFDE00",
    gold: "#B3A125",
    orange: { light: "#FD160", dark: "#FFAD00" },
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
};
