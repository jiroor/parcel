import '../scss/index.scss';

import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router/dist/vue-router.js';

Vue.use(VueRouter);

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
