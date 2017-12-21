import "vue-mdc-adapter/dist/vue-mdc-adapter.css"
import '../scss/index.scss';

import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router/dist/vue-router.js';
import VueMdcAdapter from 'vue-mdc-adapter/dist/vue-mdc-adapter.js';

Vue.use(VueRouter);
Vue.use(VueMdcAdapter);

const routes = [{
  path: '/chat',
  component: require('./chat.js')
}];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#app');
