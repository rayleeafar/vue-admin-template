const Router = require('koa-router');
const menuService =require('../services/menuService');
const response =require('../models/response');

let router =new Router();

// 获取菜单列表
router.get('/list',async(ctx,next)=>{
    let data = menuService.getList();
    ctx.body = response.success(data);
    await next();
});

module.exports = router;