import React from "react";
import "./styles.css";

interface Item {
  title: string;
  done: boolean;
}

const data: Item[] = [
  { title: "Teste1", done: false },
  { title: "Teste2", done: false },
];

export default function TodoList() {
  return (
    <div className="todo-list">
      todo list
      {data.length > 0 ? (
        data.map((item: Item) => <div className="list-item">{item.title}</div>)
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
}
