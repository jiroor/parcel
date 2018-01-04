import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        data: '',

        isRegistering: false
      }
    },

    firestore: {
    },

    computed: {
    },

    methods: {
      register() {
        const eventDocRef = cols.events.doc(this.$route.params.name);
        const colData = eventDocRef.collection('users');
        const lines = _.split(this.data, '\n');
        const keys = _.split(lines.shift(), ',').slice(1);
        const batch = db.batch();

        _.each(lines, (line) => {
          const values = _.split(line, ',');
          const id = values.shift();

          batch.set(colData.doc(id), {
            displayable: _.zipObject(keys, values)
          });
        });

        this.isRegistering = true;

        batch.commit()
          .then(() => {
            this.isRegistering = false;

            this.$router.push('/event');
          });
      }
    },

    template: '#template-page-event__register'
  };
};
