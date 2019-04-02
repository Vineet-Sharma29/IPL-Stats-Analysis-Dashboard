import Vue from 'vue'
import VueResource from 'vue-resource'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {store} from './store'
import './registerServiceWorker'


Vue.use(VueResource);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
