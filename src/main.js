import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import './assets/css/iconfont.css'
import App from './app1.vue'
import router from './router'
import axios from 'axios'

Vue.use(ElementUI)
axios.defaults.baseURL = document.querySelector('#contextPath').value
Vue.prototype.$https = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
