module.exports = {
  parcer: 'safe',
  plugins: {
    'precss': {},
    'postcss-import': {},
    'postcss-assets': {
      option: {
        basePath: './src/'
      }
    },
    'css-mqpacker': {},
    'postcss-cssnext': {},
    'cssnano': {},
  }
}