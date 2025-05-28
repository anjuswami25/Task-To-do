import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editId, setEditId] = useState(null);

  const addOrUpdateTodo = () => {
    if (!newTodo.trim()) return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: newTodo, priority } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          priority,
        },
      ]);
    }
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (todo) => {
    setNewTodo(todo.text);
    setPriority(todo.priority);
    setEditId(todo.id);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <p>A simple React Todo List App</p>
      <hr />

      <div className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.priority.toLowerCase()}`}
          >
            <span>
              {todo.text} ({todo.priority})
            </span>
            <div className="actions">
              <button onClick={() => editTodo(todo)}>✏</button>
              <button onClick={() => deleteTodo(todo.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-todo">
        <h2>{editId ? "Edit Todo" : "New Todo"}</h2>
        <input
          type="text"
          placeholder="Enter task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addOrUpdateTodo}>
          {editId ? "Update" : "Add"} Todo
        </button>
      </div>
    </div>
  );
};

export default App;
