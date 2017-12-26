import _ from 'lodash';

module.exports = (db, cols) => {
  return {
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

    template: '#template-page-chat'
  };
};
