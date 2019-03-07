const Router = require('koa-router');
const userService = require('../services/userService');
const response =require('../models/response');

let router = new Router();

router.get('/list', async (ctx, next) => {
    let {pageIndex,pageSize,keyword} = ctx.request.body;
    let data = userService.getPageList({
        pageIndex,
        pageSize,
        keyword
    });
    ctx.body = response.success(data);
    await next();
});
module.exports = router;