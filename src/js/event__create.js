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
        const event = cols.events
          .where('name', '==', this.name);

        this.isCreating = true;

        event.get()
          .then((querySnapshot) => {
            this.isCreating = false;

            if (!querySnapshot.empty) {
              console.log('すでに存在するイベントです');
              return;
            }

            cols.events.add({
              name: this.name,
              key: this.key
            });

            this.$router.push('/event');
          });
      }
    },

    template: '#template-page-event__create'
  };
};
