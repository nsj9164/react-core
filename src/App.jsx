import { useState } from "./libs/useState";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [id, setId] = useState(1);

  // 입력값 처리
  const handleChange = (event) => {
    setToDo(event.target.value);
  };

  // toDo 추가
  const handleClick = () => {
    const newToDo = { id: id, text: toDo, completed: false };
    setToDos((prev) => [...prev, newToDo]);
    setToDo("");
    setId((id) => id + 1);
  };

  // toDo 완료처리
  const handleToDo = (id) => {
    setToDos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // toDo 삭제
  const handleDelete = (id) => {
    setToDos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>My ToDo</h1>
      <input type="text" value={toDo} onChange={handleChange} />
      <button onClick={handleClick}>추가</button>
      <hr />

      <h5>📌 할 일 목록</h5>
      {toDos
        .filter((todo) => !todo.completed)
        .map((todo, i) => (
          <div key={i}>
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
      {toDos
        .filter((todo) => todo.completed)
        .map((todo, i) => (
          <div key={i}>
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
