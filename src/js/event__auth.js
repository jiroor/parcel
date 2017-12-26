import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        name: '',
        key: '',

        isAuthing: false
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
      auth() {
        const event = cols.events
          .where('name', '==', this.name)
          .where('key', '==', this.key);

        this.isAuthing = true;

        event.get()
          .then((querySnapshot) => {
            this.isAuthing = false;

            if (querySnapshot.empty) {
              console.log('そんなイベントはない');
              return;
            }

            this.$router.push(`/event/${this.$route.params.to}/${this.name}`);
          });
      }
    },

    template: '#template-page-event__auth'
  };
};
