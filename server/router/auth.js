const authService = require('../services/authService');
const Router = require('koa-router');
const response = require('../models/response');

let router = new Router();

// 登录 
router.post('/login', async (ctx, next) => {
    let { username, password } = ctx.request.body;
    if (username && password) {
        let token = authService.login({
            username,
            password
        });
        ctx.body = response.success(token);
        await next();
    } else {
        ctx.body = response.failure('用户名或密码为空');
    }
});

// 注销登录
router.post('/logout', async (ctx, next) => {
    let token = ctx.request.headers['x-token'];
    authService.logout(token);
    ctx.body = response.success();
    await next();
});

// 检查token是否有效
router.post('/checktoken', async (ctx, next) => {
    let token = ctx.request.headers['x-token'];
    ctx.body = response.success(authService.validateToken(token));
    await next();
});

module.exports = router;