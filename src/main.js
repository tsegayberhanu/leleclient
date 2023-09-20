import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import AppFooter from "./components/Application/AppFooter"
import AppHeader from "./components/Application/AppHeader"
Vue.config.productionTip = false
Vue.component('app-footer', AppFooter)
Vue.component('app-header', AppHeader)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
