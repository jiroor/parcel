import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        user: {}
      }
    },

    firestore() {
      return {
        user: cols.events.doc(this.$route.params.name).collection('users').doc(this.$route.params.id)
      }
    },

    computed: {
    },

    methods: {
      back() {
        this.$router.push(`/event/join/${this.$route.params.name}`);
      },

      accept() {
        this.$firestoreRefs.user.update({
          joined: true
        });

        console.log('joined');

        this.$router.push(`/event/complete/${this.$route.params.name}`);
      }
    },

    template: '#template-page-event__confirm'
  };
};
