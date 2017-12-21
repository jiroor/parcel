import "vue-mdc-adapter/dist/vue-mdc-adapter.css"
import '../scss/index.scss';

import * as firebase from 'firebase';
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router/dist/vue-router.js';
import VueMdcAdapter from 'vue-mdc-adapter/dist/vue-mdc-adapter.js';
import Vuefire from 'vuefire/dist/vuefire.js';

require('firebase/firestore');

Vue.use(VueRouter);
Vue.use(VueMdcAdapter);
Vue.use(Vuefire);

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC7VtLhSkzxNzl5jg5pbjSgHnHnHXCjRf4",
  authDomain: "jiroor-add68.firebaseapp.com",
  databaseURL: "https://jiroor-add68.firebaseio.com",
  projectId: "jiroor-add68",
  storageBucket: "jiroor-add68.appspot.com",
  messagingSenderId: "774646153392"
});
const db = firebase.firestore();

const cols = {
  messages: db.collection('messages')
};

const routes = [{
  path: '/chat',
  component: require('./chat.js')(cols)
}];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount('#app');
