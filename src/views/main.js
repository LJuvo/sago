import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import vueSwiper from 'vue-awesome-swiper'  //引入vue-awesome-swiper
import 'swiper/swiper-bundle.css'  //引入样式

import axios from 'axios'
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://www.riaeasy.com:9071'

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(vueSwiper);  //使用插件

new Vue({
  store,
  render: h => h(App)
}).$mount('#screenBaCO')
