const Router = require('koa-router');
const userService = require('../services/userService');
const response = require('../models/response');

let router = new Router();

// 获取用户分页列表
router.get('/list', async (ctx, next) => {
    let { pageIndex, pageSize, keyword } = ctx.request.query;
    let data = userService.getPageList({
        pageIndex,
        pageSize,
        keyword
    });
    ctx.body = response.success(data);
    await next();
});

// 添加一个新的用户
router.post('/add', async (ctx, next) => {
    let { userName, phone, email } = ctx.request.body;
    // 校验参数 
    // ...
    userService.add({
        userName: userName,
        phone: phone,
        email: email,
        createTime: Date.now()
    });
    ctx.body = response.success();
    await next();
});

// 更新一个用户 
router.post('/update', async (ctx, next) => {
    let { id, userName, phone, email } = ctx.request.body;
    // 校验参数 
    // ...
    userService.update(id, {
        email,
        phone,
        userName
    });

    ctx.body = response.success();
    await next();
});

// 删除一个用户
router.post('/delete', async (ctx, next) => {
    let { id } = ctx.request.body;
    userService.remove(id);
    ctx.body = response.success();
    await next();
});
module.exports = router;