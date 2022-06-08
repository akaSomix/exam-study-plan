module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DEFINE PALETTE HERE
        primary: {
          100: "#E98074",
          200: "#E85A4F"
        },
        background: {
          100: "#EAE7DC",
          200: "#D8C3A5"
        },
        paragraph: {
          100: "#FFFFFF",
          200: "#000000"
        },
        disabled: {
          100: "#8E8D8A"
        },
        accent: {
          100: "#00d1b9",
          200: "#8E8D8A"
        },

      }
    },
    gridTemplateColumns: {
      // Course entry column template
      'course': '6fr 1fr 1fr 1fr',
    }
  },
  plugins: [],
}
