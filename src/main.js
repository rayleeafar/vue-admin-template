import Vue from 'vue';
// 应用程序入口页
import App from './App';
// 路由配置
import router from './router';
// ajax封装
import ajax from './server/ajax';
// 全局过滤器集合
import filters from './filters';

// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 将elementui需要用到的css样式在根组件中引用进来，这样在所有子组件中都可以直接使用

// 引入自定义全局样式
import './styles/site.css';

// 注册全局过滤器
filters.forEach(el => {
  Vue.filter(el.name,el.filter);
});

Vue.config.productionTip = false;
Vue.use(ElementUI); // 注册ElementUI插件

// 将ajax绑定到Vue的实例上
Vue.prototype.$ajax = ajax;


/*
以下两种方式完全等效

new Vue({
  router,
  render:h=>h(App)
}).$mount('#app');
 */

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>' // 使用单标签和标签对都可以，目的是为了渲染App组件的内容
});