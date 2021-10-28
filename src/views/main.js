import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import iView from "iview";
import "iview/dist/styles/iview.css";

import axios from "axios";
Vue.prototype.$axios = axios;

import _ from "lodash";
Vue.prototype._ = _;

Vue.use(iView);

axios.defaults.baseURL = "http://www.riaeasy.com:9071";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#screenBaCO");
