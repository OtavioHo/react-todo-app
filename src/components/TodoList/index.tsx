import React, { useState, FormEvent } from "react";
import "./styles.css";

interface Item {
  title: string;
  done: boolean;
}

export default function TodoList() {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editing, setEditing] = useState<number>(-1);
  const [editingValue, setEditingValue] = useState<string>("");

  const createItem = (e: FormEvent) => {
    e.preventDefault();
    setTodoList([...todoList, { title: newTodo, done: false }]);
    setNewTodo("");
  };

  const startEditing = (index: number) => {
    setEditingValue(todoList[index].title);
    setEditing(index);
  };

  const saveEdit = (e: FormEvent) => {
    e.preventDefault();
    let newList = [...todoList];
    newList[editing].title = editingValue;
    setTodoList(newList);
    setEditing(-1);
  };

  const toggleTask = (index: number) => {
    let newList = [...todoList];
    newList[index].done = !todoList[index].done;
    setTodoList(newList);
  };

  return (
    <div className="todo-list">
      {todoList.length > 0 ? (
        todoList.map((item: Item, index: number) => (
          <div className="list-item" key={index}>
            <button onClick={() => toggleTask(index)}>
              {item.done ? "check" : "uncheck"}
            </button>
            {editing === index ? (
              <form onSubmit={(event) => saveEdit(event)}>
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditing(-1)}>Cancel</button>
              </form>
            ) : (
              <div>
                <div onClick={() => startEditing(index)}>{item.title}</div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>Empty</div>
      )}
      <div className="">
        <form onSubmit={createItem}>
          <input
            type="text"
            placeholder="New To Do"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          ></input>
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
}
