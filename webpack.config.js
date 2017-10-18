const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: ['babel-polyfill', './index.js']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    publicPath: '/' // for hot building
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./public/*.*']),
    new ExtractTextPlugin("index-[hash].css"),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyHtmlToEjs({
      src: path.resolve(__dirname, 'public/index.html'),
      dest: path.resolve(__dirname, 'src/server/view/index.ejs')
    })
  ],
  stats: {
    colors: true // Nice colored output
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map',
  watch: true
};

if (process.env.NODE_ENV === 'production') {
  delete config.devtool;
  delete config.watch;
}

function CopyHtmlToEjs(options) {
  this.src = options.src;
  this.dest = options.dest;
}

CopyHtmlToEjs.prototype.apply = function (compiler) {
  var _this = this;
  compiler.plugin('done', function (stats) {
    console.log(stats.hash);
    var data = fs.readFileSync(_this.src, 'utf8');
    fs.writeFileSync(_this.dest, data);
  })
};


module.exports = config;