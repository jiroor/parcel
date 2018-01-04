import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        event: {},
        users: []
      }
    },

    firestore() {
      return {
        event: cols.events.doc(this.$route.params.name),
        users: cols.events.doc(this.$route.params.name).collection('users')
      }
    },

    computed: {
      joinedUsers() {
        return _.filter(this.users, (user) => {
          return user.joined;
        });
      },

      unjoinedUsers() {
        return this.users.length - this.joinedUsers.length;
      },

      drunkUsers() {
        return _.filter(this.users, (user) => {
          return _.eq(user.displayable['懇親会'], '参加する');
        });
      },

      drunkJoinedUsers() {
        return _.filter(this.joinedUsers, (user) => {
          return _.eq(user.displayable['懇親会'], '参加する');
        });
      },

      fee() {
        return _.reduce(this.users, (result, user) => {
          return result + _.reduce(this.event.fees, (result, fee) => {
            return result + (_.eq(_.get(user.displayable, fee.key), fee.value) ? +fee.amount : 0);
          }, 0);
        }, 0);
      },

      currentFee() {
        return _.reduce(this.users, (result, user) => {
          return result + _.reduce(this.event.fees, (result, fee) => {
            return result + (user.joined && _.eq(_.get(user.displayable, fee.key), fee.value) ? +fee.amount : 0);
          }, 0);
        }, 0);
      }
    },

    methods: {
    },

    template: '#template-page-event__manage'
  };
};
