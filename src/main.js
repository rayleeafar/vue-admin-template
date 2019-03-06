import Vue from 'vue';
import App from './App';
import router from './router';

// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI); // 注册ElementUI插件

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