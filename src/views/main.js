import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import axios from 'axios'
Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://www.riaeasy.com:9071'

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
  store,
  render: h => h(App)
}).$mount('#screenBaCO')
