import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        registering: false,

        newUser: {
          name: '',
          slackId: '',
          company: '',
          drunk: false
        },

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
      add() {
        const colData = cols.events.doc(this.$route.params.name).collection('users');

        colData.doc(this.newUser.name).set({
          displayable: {
            'Slack ID': this.newUser.slackId || '-',
            '企業名': this.newUser.company || '-',
            '懇親会': this.newUser.drunk ? '参加する' : '参加しない'
          },
          joined: true
        });

        this.$router.push(`/event/complete/${this.$route.params.name}/${this.newUser.name}`);
      },

      join(user) {
        this.$router.push(`/event/confirm/${this.$route.params.name}/${user.id}`);
      },
    },

    template: '#template-page-event__join'
  };
};
