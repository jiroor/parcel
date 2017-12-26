import _ from 'lodash';

module.exports = (db, cols) => {
  return {
    data() {
      return {
        id: '',
        todos: [],
        filter: {
          doing: {
            label: '実行中',
            checked: true
          },
          done: {
            label: '終了済み',
            checked: false
          }
        }
      }
    },

    firestore: {
      todos: cols.todos.orderBy('insert', 'asc')
    },

    methods: {
      add() {
        cols.todos.doc(this.id).set({
          done: false,
          insert: new Date()
        });

        this.id = '';
      },

      done(todo) {
        cols.todos.doc(todo.id).update({
          done: !todo.done
        });
      },

      remove(todo) {
        this.$refs.dialogRemove[0].show();
      },

      onAcceptToRemove(todo) {
        cols.todos.doc(todo.id).delete();
      },

      onCancelToRemove() {
      }
    },

    template: '#template-page-todo'
  };
};
