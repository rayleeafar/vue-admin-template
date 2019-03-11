import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

export default new Router({
  routes: [
    ...routes, // 各个组件/页面使用的具体路由
    { path: '*', redirect: 'hello' } // 对所有未正确匹配的路由进行重定向操作，重定向到Index路由
  ]
});
