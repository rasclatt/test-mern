module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.corp-btn': {
          '@apply transition ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-auto uppercase': {},
        },
      };
      addUtilities(newUtilities);
    }),
  ],
    safelist: [{ pattern: /.*/ }],
  };