import webpack from 'webpack';
import Config from 'webpack-config';
const path = require('path');

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    __dirname + '/../src/index.jsx',
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]',
              minimize: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
