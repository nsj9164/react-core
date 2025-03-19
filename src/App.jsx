import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "./libs/useState";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState("");

  // 입력값 처리
  const handleChange = (event) => {
    setTodoItem(event.target.value);
  };

  // toDo 추가
  const handleClick = () => {
    if (todoItem.trim() === "") return;
    const newToDo = { id: Date.now(), text: todoItem, completed: false };
    setTodoList((prev) => [...prev, newToDo]);
    setTodoItem("");
  };

  // toDo 완료처리
  const handleToDo = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // toDo 삭제
  const handleDelete = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>My ToDo</h1>
      <input type="text" value={todoItem} onChange={handleChange} />
      <button onClick={handleClick}>추가</button>
      <hr />

      <h5>📌 할 일 목록</h5>
      {todoList
        .filter((todo) => !todo.completed)
        .map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onClick={() => handleToDo(todo.id)}
            />
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </div>
        ))}
      <hr />

      <h5>📌 완료한 목록</h5>
      {todoList
        .filter((todo) => todo.completed)
        .map((todo, i) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onClick={() => handleToDo(todo.id)}
            />
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </div>
        ))}
    </div>
  );
}
export default App;
