import '../scss/index.scss';

import * as firebase from 'firebase';
import _ from 'lodash';
import Vue from 'vue/dist/vue.js';
import Vuefire from 'vuefire/dist/vuefire.js';

require('firebase/firestore');

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

new Vue({
  data() {
    return {
      messageText: '',
      messages: []
    }
  },

  firestore: {
    messages: cols.messages.orderBy('insert', 'desc')
  },

  methods: {
    sendMessage() {
      if (this.messageText) {
        cols.messages.add({
          text: this.messageText,
          insert: new Date()
        });

        this.messageText = '';
      }
    }
  },

  el: '#app'
});
