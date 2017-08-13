const Router = require('koa-router');
var router = new Router();

function* index() {
    yield this.render('index');
}


router.get('/*', index);

module.exports = router;