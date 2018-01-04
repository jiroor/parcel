import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        filter: {
          name: '',
          slackId: '',
          company: ''
        },

        users: []
      }
    },

    firestore() {
      return {
        users: cols.events.doc(this.$route.params.name).collection('users')
      };
    },

    computed: {
      filteredUsers() {
        if (_.isEmpty(this.filter.name) && _.isEmpty(this.filter.slackId) && _.isEmpty(this.filter.company)) {
          return [];
        }

        return _.chain(this.users)
          .filter((user) => {
            return !user.joined;
          })
          .filter((user) => {
            return _.isEmpty(this.filter.name) || new RegExp(`.*${this.filter.name}.*`, 'i').test(user.id);
          })
          .filter((user) => {
            return _.isEmpty(this.filter.slackId) || new RegExp(`.*${this.filter.slackId}.*`, 'i').test(user.displayable['Slack ID']);
          })
          .filter((user) => {
            return _.isEmpty(this.filter.company) || new RegExp(`.*${this.filter.company}.*`, 'i').test(user.displayable['企業名']);
          })
          .value();
      }
    },

    methods: {
      join(user) {
        this.$router.push(`/event/confirm/${this.$route.params.name}/${user.id}`);
      },
    },

    template: '#template-page-event__join'
  };
};
