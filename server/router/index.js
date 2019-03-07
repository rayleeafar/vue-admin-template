const Router = require('koa-router');
const userRouter = require('./user');
const authRouter = require('./auth');
const authService = require('../services/authService');
const menuRouter = require('./menu');

let router = new Router();

// 登录鉴权
router.use('*', async (ctx,next)=>{
    if(ctx.request.path.toLowerCase()=='/auth/login'){
        await next();
    }else{
        let token = ctx.request.headers['x-token'];
        if(!token||!authService.validateToken(token)){
            ctx.status = 401;
            ctx.body = '您没有访问权限';
        }else{
            await next();
        }
    }
});

// 用户相关的路由
router.use('/user', userRouter.routes());
router.use('/auth', authRouter.routes());
router.use('/menu',menuRouter.routes());

module.exports = router;