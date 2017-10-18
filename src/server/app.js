'use strict';

const fs = require('fs');
const argv = require('yargs').argv;
const router = require('./router/index');
const ejs = require('koa-ejs');
const path = require('path');
const koa = require('koa');
const mount = require('koa-mount');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const app = new koa();
const appStatic = new koa();
const PORT = argv.p || 8039;

app.use(koaBody());

appStatic.use(koaStatic(path.join(__dirname, '../../public'), {
  maxage: 0
}));
app.use(mount('/', appStatic))
// 静态资源加载，为什么要采用上面那种mount方式？
// app.use(koaStatic(path.join(__dirname, '../../public'), {
//   maxage: 0
// }));

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




