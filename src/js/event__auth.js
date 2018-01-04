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
        const eventDocRef = cols.events.doc(this.name);

        this.isAuthing = true;

        eventDocRef.get()
          .then((doc) => {
            this.isAuthing = false;

            if (!doc.exists) {
              console.log('そんなイベントはない');
              return;
            }

            if (!_.eq(this.key, doc.data().key)) {
              console.log('マスターキーが違う');
              return;
            }

            this.$router.push(`/event/${this.$route.params.to}/${this.name}`);
          });
      }
    },

    template: '#template-page-event__auth'
  };
};
