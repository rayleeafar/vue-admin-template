const koa = require('koa');
const router = require('./router');
const bodyParser =require('koa-bodyparser');
const cors = require('./middlewares/cors');
const globalException = require('./middlewares/globalExceptionMiddleware');
const config = require('./config');

let app = new koa();

// 请求体转换器
app.use(bodyParser());

// 设置跨域
app.use(cors());

// 全局异常捕获
app.use(globalException());

// 绑定路由
app.use(router.routes());

// 添加监听
app.listen(config.port, () => {
    console.log(`程序已经启动:http://localhost:${config.port}`);
});

