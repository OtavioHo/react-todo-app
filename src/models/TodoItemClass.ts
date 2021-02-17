import { makeObservable, observable, action } from "mobx";

export default class TodoItemClass {
  id = Math.random();
  title = "";
  done = false;

  constructor(title: string) {
    makeObservable(this, {
      title: observable,
      done: observable,
      toggle: action,
    });

    this.title = title;
  }

  toggle() {
    this.done = !this.done;
  }
}
