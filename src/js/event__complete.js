import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        event: {},
        user: {}
      }
    },

    firestore() {
      return {
        event: cols.events.doc(this.$route.params.name),
        user: cols.events.doc(this.$route.params.name).collection('users').doc(this.$route.params.id)
      }
    },

    computed: {
      fee() {
        return _.reduce(this.event.fees, (result, fee) => {
          return result + (_.eq(_.get(this.user.displayable, fee.key), fee.value) ? +fee.amount : 0);
        }, 0);
      }
    },

    methods: {
    },

    template: '#template-page-event__complete'
  };
};
