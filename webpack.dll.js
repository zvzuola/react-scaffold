const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const vendors = [
  'react',
  'react-dom',
  'react-router',
];
module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, './public'),
    filename: '[name].dll.js',
    library: '[name]',
    publicPath: '/',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new CleanWebpackPlugin(['./public/*.*']),
    new webpack.DllPlugin({
      path: path.join(__dirname, './public/manifest.json'),
      name: '[name]',
    }),
  ],
};
