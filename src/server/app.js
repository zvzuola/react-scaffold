'use strict';

var fs = require('fs');
var argv = require('yargs').argv;
var PORT = argv.p || 8039;


// 兼容服务端加载html文件


require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

var router = require('./router/index');
var ejs = require('koa-ejs');
var path = require('path');
var http = require('http');
var koa = require('koa');
var mount = require('koa-mount');

var app = koa();
var appStatic = koa();

appStatic.use(require('koa-static')(path.join(__dirname, '../../public'), {
  maxage: 0
}));

app.use(mount('/', appStatic))

process.title = '';

ejs(app, {
  root: path.join(__dirname, 'view'),
  viewExt: 'ejs',
  cache: false,
  layout: false,
  debug: true
});

app.use(router.routes())
    .use((router.allowedMethods()));

//@FIXIT
app.on('error', function (err) {
  console.log(err);
})

app.listen(PORT, function (err) {
  if (!err) console.log('Server start at http://localhost:%s', PORT)
  else throw err
});




