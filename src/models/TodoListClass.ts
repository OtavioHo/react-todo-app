import { action, computed, makeObservable, observable } from "mobx";
import TodoItemClass from "./TodoItemClass";

export default class TodoListClass {
  todos: TodoItemClass[] = [];

  get length() {
    return this.todos.length;
  }

  constructor(todos: TodoItemClass[]) {
    makeObservable(this, {
      todos: observable,
      add: action,
      length: computed,
    });
    this.todos = todos;
  }

  add(todo: TodoItemClass) {
    this.todos.push(todo);
  }
}
