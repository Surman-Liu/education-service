// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lottie from 'vue-lottie';
import App from './App';
import router from './router/index';
import store from './store/store';
import './style/global.css';
// 全屏滚动 vue-fullpage.js
import 'fullpage.js/vendors/scrolloverflow';
import VueFullpage from 'vue-fullpage.js';
// localStorage缓存
import { Storage } from './utils/storage';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueFullpage);
Vue.component('lottie', lottie);
// 全局挂在axios
Vue.prototype.$axios = axios;
// 全局挂载localStorage
Vue.prototype.$localStorage = new Storage();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>',
});
