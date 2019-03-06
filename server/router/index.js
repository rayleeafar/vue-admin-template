const Router = require('koa-router');
const userRouter = require('./user');

let router = new Router();

// 用户相关的路由
router.use('/user', userRouter.routes());

module.exports = router;