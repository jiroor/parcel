import _ from 'lodash';

module.exports = (cols) => {
  return {
    data() {
      return {
        data: ''
      }
    },

    firestore: {
      events: cols.events
    },

    computed: {
    },

    methods: {
      register() {
        let lines = _.split(this.data, '\n');
        const keys = _.split(lines.shift(), ',');
        let data = [];

        _.each(lines, (line) => {
          const values = _.split(line, ',');

          data.push(_.zipObject(keys, values));
        });

        console.log(data);

        this.$router.push('/event');
      }
    },

    template: '#template-page-event__register'
  };
};
