import _ from 'lodash';

module.exports = (cols) => {
  return {
    data() {
      return {
        events: [{
          title: '作成',
          text: 'イベントを作成します。',
          actionText: '作成する',
          to: '/event/create'
        }, {
          title: '登録',
          text: '作成したイベントにデータを登録します。',
          actionText: '登録する',
          to: '/event/auth/register'
        }, {
          title: '参加',
          text: 'イベントに参加します。',
          actionText: '参加する',
          to: '/event/join'
        }]
      }
    },

    firestore: {
    },

    methods: {
      to(event) {
        this.$router.push(event.to);
      }
    },

    template: '#template-page-event'
  };
};
