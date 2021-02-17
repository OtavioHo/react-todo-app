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
import { observer } from "mobx-react-lite";

import TodoListClass from "../../models/TodoListClass";
import TodoItemClass from "../../models/TodoItemClass";

interface Props {
  todoList: TodoListClass;
}

const TodoList = observer((props: Props) => {
  const { todoList } = props;
  const [newTodo, setNewTodo] = useState<string>("");
  const [editing, setEditing] = useState<number>(-1);
  const [editingValue, setEditingValue] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const renderList = (list: TodoListClass) =>
    list.todos.map(
      (item: TodoItemClass, index: number) =>
        (showCompleted || !item.done) && (
          <div className="list-item" key={index}>
            <div className="check-container" onClick={() => toggleTask(item)}>
              <FontAwesomeIcon
                size={"2x"}
                icon={item.done ? faCheckCircle : faCircle}
              />
            </div>
            {editing === item.id ? (
              <form onSubmit={(event) => saveEdit(event, item)}>
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
                className={item.done ? "list-title title-done" : "list-title"}
                onClick={() => startEditing(item.id)}
              >
                {item.title}
              </div>
            )}
          </div>
        )
    );

  const createItem = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo !== "") {
      todoList.add(new TodoItemClass(newTodo));
      setNewTodo("");
    }
  };

  const startEditing = (index: number) => {
    setEditingValue(
      todoList.todos.filter((item) => item.id === index)[0].title
    );
    setEditing(index);
  };

  const saveEdit = (e: FormEvent, item: TodoItemClass) => {
    e.preventDefault();
    if (editingValue !== "") {
      item.title = editingValue;
      setEditing(-1);
    }
  };

  const toggleTask = (item: TodoItemClass) => {
    item.toggle();
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
        </div>
        <div className="todo-list">
          <button
            className="toggle-checked-button"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </button>
          *To edit click on the task title
        </div>
      </div>
      <div className="todo-list">
        {todoList.length > 0 ? (
          renderList(todoList)
        ) : (
          <div className="list-item">
            <div className="list-title">No Tasks!</div>
          </div>
        )}
      </div>
    </div>
  );
});

export default TodoList;
