import "../App.css";
import { TodosContext } from "../context/TodosContext";
import TodoList from "./TodoList";
import NoTodos from "./NoTodos";
import TodoForm from "./TodoForm";
import useLocalStorage from "../custom_hooks/useLocalStorage"
import { useRef, useEffect, useState } from "react";

function App() {

  const [todos, setTodos] = useLocalStorage('todos', [])
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1)
  const [name, setName] = useLocalStorage('name', '')
  const [filter, setFilter] = useState('all')
  const nameInputEl = useRef(null)

  useEffect(() => {
    nameInputEl.current.focus()
    setName(JSON.parse(localStorage.getItem('name')) ?? '')
  }, [name])

  function handleName(event) {
    setName(event.target.value)
    localStorage.setItem('name', JSON.stringify(event.target.value))
  }

  return (
    <TodosContext.Provider value={{ todos, setTodos, idForTodo, setIdForTodo, filter, setFilter }}>
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            <h2>What's your name</h2>
            <form action="/">
              <input type="text"
                     className="todo-input"
                     placeholder="What's your name"
                     ref={nameInputEl}
                     value={name}
                     onChange={handleName}
              />
            </form>
            {name && <p className="name-label">Hello, {name}</p>}
          </div>
          <h2>Todo App</h2>
          <TodoForm />
          {todos.length > 0 ?
            <TodoList />
            :
            <NoTodos />
          }
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;