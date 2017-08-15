const {observable, action, autorun} = mobx;

const todo = title => observable({
  title: title,
  completed: false,
  toggleCompletion: action(function () {this.completed = !this.completed})
});

const todoApp = observable({
  todos: [],
  addTodo: action(function(todo) {this.todos.push(todo)}),
  removeTodo: action(function(todo) {this.todos.splice(this.todos.indexOf(todo), 1)}),
  toggleAll: action(function() {this.todos.forEach(todo => todo.toggleCompletion())}),
  get totalTodosNumber() {
    return this.todos.length;
  },
  get totalCompletedTodosNumber() {
    return this.todos.filter(todo => todo.completed).length;
  }
});

autorun(() => {
  console.log('todos: ', todoApp.todos
    .map(todo => todo.title)
    .join(", "));
});

autorun(() => {
  console.log('total Todos ', todoApp.totalTodosNumber);
});

autorun(() => {
  console.log('total completed Todos ', todoApp.totalCompletedTodosNumber);
});
