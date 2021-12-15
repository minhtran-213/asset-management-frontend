module.exports = {
  purge: {
    mode: 'all',
    content: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.{js,jsx}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#CF2338',
        amber: '#E30C18',
      },
      fontFamily: {
        primary: '"Segoe UI"',
      },
      fontSize: {
        primary: '20px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#CF2338',
        amber: '#E30C18',
      },
      fontFamily: {
        primary: '"Segoe UI"',
      },
      fontSize: {
        primary: '20px',
      },
      marginRight: {
        '21rem': '21rem',
        '25rem': '25rem',
        '30rem': '30rem',
        '70rem': '70rem',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
