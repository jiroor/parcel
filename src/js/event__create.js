import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        name: '',
        key: '',

        isCreating: false
      }
    },

    firestore: {
    },

    computed: {
      eventDisabled() {
        return !(this.name && this.key);
      }
    },

    methods: {
      create() {
        const eventDocRef = cols.events.doc(this.name);

        this.isCreating = true;

        eventDocRef.get()
          .then((doc) => {
            this.isCreating = false;

            if (doc.exists) {
              console.log('すでに存在するイベントです');
              return;
            }

            eventDocRef.set({
              key: this.key
            });

            this.$router.push('/event');
          });
      }
    },

    template: '#template-page-event__create'
  };
};
