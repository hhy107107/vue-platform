import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import App from './app1.vue'
import router from './router'
import Marked from 'marked'
Vue.use(ElementUI)
/* eslint-disable no-new */
Object.definePrototype(Vue.prototype, '$Marked', { value: Marked })
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
