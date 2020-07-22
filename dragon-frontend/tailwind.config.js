module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
    },
  },
  variants: {
    textColor: ['responsive', 'focus', 'active', 'hover'],
    backgroundColor: ['responsive', 'focus', 'active', 'hover', 'disabled'],
    borderWidth: ['responsive', 'last', 'active', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
};
