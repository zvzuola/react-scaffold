const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DEV = process.env.NODE_ENV !== 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

let config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: ['./index.js'],
    vendor: ['react', 'react-dom', 'react-router']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[hash].js',
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
        use: DEV ? ["style-loader", "css-loader"] : ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.less$/,
        use: DEV ? ["style-loader", "css-loader", "less-loader"] : ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|eot|woff|woff2|svg|ttf)([\?]?.*)$/i,
        use: DEV ? ['url-loader'] : ['file-loader']
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          chunks: "all",
          priority: -20 //优先级调低
        },
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: 'vendor'
        }
      }
    },
    minimize: !DEV,
  },
  plugins: [
    new CleanWebpackPlugin(['./public/*.*']),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './static_file') } // 把static_file的文件拷到对应的output目录下
    ])
  ],
  stats: {
    colors: true // Nice colored output
  },
  // Create Sourcemaps for the bundle
  devtool: !DEV ? false : 'source-map',
  watch: DEV,
  mode: process.env.NODE_ENV || 'development'
};

if (!DEV) {
  config.entry.index.unshift(
    'babel-polyfill',
  );
  config.output.filename = '[name].[chunkhash].js'
  config.plugins.push(...[
    new ExtractTextPlugin("index-[hash].css"),
    new CopyHtmlToEjs({
      src: path.resolve(__dirname, 'public/index.html'),
      dest: path.resolve(__dirname, 'src/server/view/index.ejs')
    })
  ]);
} else {
  config.entry.index.unshift(
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8800',
    'webpack/hot/only-dev-server'
  );
  config.plugins.push(...[
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ]);
}

function CopyHtmlToEjs(options) {
  this.src = options.src;
  this.dest = options.dest;
}

CopyHtmlToEjs.prototype.apply = function (compiler) {
  var _this = this;
  compiler.hooks.done.tap('CopyHtmlToEjs', function (stats) {
    console.log(stats.hash, '-------------');
    var data = fs.readFileSync(_this.src, 'utf8');
    fs.writeFileSync(_this.dest, data);
  })
};


module.exports = config;