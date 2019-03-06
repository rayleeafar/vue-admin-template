const Router = require('koa-router');

let router = new Router();

router.get('/list', (ctx, next) => {
    ctx.body = ctx.db.users.getList();
    next();
});
module.exports = router;