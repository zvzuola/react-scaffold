const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const port = 8800;
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  disableHostCheck: true,
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
});
server.listen(port, function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://localhost:${port}/`)
});
