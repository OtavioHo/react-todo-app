import React from "react";

import Header from "./components/Header";
import TodoList from "./components/TodoList";

import TodoListClass from "./models/TodoListClass";

const store = new TodoListClass([]);

function App() {
  return (
    <div className="App">
      <Header />
      <TodoList todoList={store} />
    </div>
  );
}

export default App;
