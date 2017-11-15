const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DEV = process.env.NODE_ENV !== 'production';

let config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: ['./index.js']
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
  plugins: [
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
  devtool: 'source-map',
  watch: true
};

if (process.env.NODE_ENV === 'production') {
  config.entry.index.unshift(
    'babel-polyfill',
  );
  config.output.filename = '[name].[chunkhash].js'
  config.plugins.push(...[
    new CleanWebpackPlugin(['./public/*.*']),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("index-[hash].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        if (module.resource && (/^.*\.(css|scss|less|jpe?g|png|gif|eot|woff|woff2|svg|ttf)$/).test(module.resource)) {
          return false;
        }
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyHtmlToEjs({
      src: path.resolve(__dirname, 'public/index.html'),
      dest: path.resolve(__dirname, 'src/server/view/index.ejs')
    })
  ]);
  delete config.devtool;
  delete config.watch;
} else {
  config.entry.index.unshift(
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8800',
    'webpack/hot/only-dev-server'
  );
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
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