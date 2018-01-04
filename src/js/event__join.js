import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        name: '',

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
        if (_.isEmpty(this.name)) {
          return [];
        }

        return _.filter(this.users, (user) => {
          return !user.joined && new RegExp(`.*${this.name}.*`, 'i').test(user.id);
        });
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
