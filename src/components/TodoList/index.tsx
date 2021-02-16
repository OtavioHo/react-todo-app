import React, { useState, FormEvent } from "react";
import "./styles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCheckCircle,
  faSave,
  faTimesCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface Item {
  title: string;
  done: boolean;
}

export default function TodoList() {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editing, setEditing] = useState<number>(-1);
  const [editingValue, setEditingValue] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const createItem = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo !== "") {
      setTodoList([...todoList, { title: newTodo, done: false }]);
      setNewTodo("");
    }
  };

  const startEditing = (index: number) => {
    setEditingValue(todoList[index].title);
    setEditing(index);
  };

  const saveEdit = (e: FormEvent) => {
    e.preventDefault();
    if (editingValue !== "") {
      let newList = [...todoList];
      newList[editing].title = editingValue;
      setTodoList(newList);
      setEditing(-1);
    }
  };

  const toggleTask = (index: number) => {
    let newList = [...todoList];
    newList[index].done = !todoList[index].done;
    setTodoList(newList);
  };

  return (
    <div>
      <div className="todo-list">
        <div className="list-item">
          <form onSubmit={createItem}>
            <input
              className="edit-input"
              type="text"
              placeholder="New To Do"
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
            />
            <button type="submit" className="confirm-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </form>
          <button onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </button>
        </div>
      </div>
      <div className="todo-list">
        {todoList.length > 0 ? (
          todoList.map(
            (item: Item, index: number) =>
              (showCompleted || !item.done) && (
                <div className="list-item" key={index}>
                  <div
                    className="check-container"
                    onClick={() => toggleTask(index)}
                  >
                    <FontAwesomeIcon
                      size={"2x"}
                      icon={item.done ? faCheckCircle : faCircle}
                    />
                  </div>
                  {editing === index ? (
                    <form onSubmit={(event) => saveEdit(event)}>
                      <input
                        className="edit-input"
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                      />
                      <button type="submit" className="confirm-button">
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button
                        onClick={() => setEditing(-1)}
                        className="last-button cancel-button"
                      >
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </button>
                    </form>
                  ) : (
                    <div
                      className={
                        item.done ? "list-title title-done" : "list-title"
                      }
                      onClick={() => startEditing(index)}
                    >
                      {item.title}
                    </div>
                  )}
                </div>
              )
          )
        ) : (
          <div className="list-item">
            <div className="list-title">Empty</div>
          </div>
        )}
      </div>
    </div>
  );
}
