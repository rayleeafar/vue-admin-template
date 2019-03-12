const Router = require('koa-router');
const userRouter = require('./user');
const authRouter = require('./auth');
const authService = require('../services/authService');
const menuRouter = require('./menu');

let router = new Router();

// 登录鉴权
router.use('*', async (ctx,next)=>{
    // 登录和检查token是否有效的接口不需要鉴权
    let ignores = ['/auth/login','/auth/checktoken'];
    let path=ctx.request.path.toLowerCase();
    if(ignores.indexOf(path)!=-1){
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