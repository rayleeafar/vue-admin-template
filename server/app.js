const koa = require('koa');
const db = require('./data/db'); // 使用内存变量模拟的数据库
const router = require('./router');

let app = new koa();

// 使用自定义请求处理函数，将数据库操作对象添加到上下文中
app.use((ctx, next) => {
    ctx.db = db;
    next();
});

// 绑定路由
app.use(router.routes());

// 添加监听
app.listen(8001, () => {
    console.log('程序已经启动，请访问：http://localhost:8001');
});

