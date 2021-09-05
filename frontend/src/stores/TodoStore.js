import { getTodos, updateTodo } from "../middleware/Api";
import { observable, action, computed } from "mobx";

export class TodoStore {
  @observable
  todoRegistry = observable.map();

  @computed
  get todos() {
    return [...this.todoRegistry.values()];
  }

  getTodo(id) {
    return this.todoRegistry.get(id);
  }

  @action
  async loadTodos() {
    getTodos().then((todos) => {
      todos.forEach((todo) => this.todoRegistry.set(todo.id, todo));
    });
  }

  @action
  async updateTodo(id, data) {
    updateTodo(id,data);
	const todo = this.getTodo(id);
	this.todoRegistry.set(id, {...todo, todoItems: data.todoItems});
  }
}
