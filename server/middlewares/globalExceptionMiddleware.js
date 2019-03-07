const response = require('../models/response');
module.exports =()=>{
    return async(ctx,next)=>{
        // 注意 ：在整个路由处理过程中如果使用了async关键字 请保证每个路由处理函数都使用async/await来处理
        try{
           await next();
       }catch(ex){
          console.log(`未捕获的异常：${ex}`);
          ctx.status = 500;
          // ex.message查看异常的描述信息
          ctx.body = response.failure(ex.message);
       }
   };
}  