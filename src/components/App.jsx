import "../App.css";
import TodoList from "./TodoList";
import NoTodos from "./NoTodos";
import TodoForm from "./TodoForm";
import {useState, useRef, useEffect, useMemo} from "react";

function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish React Series",
      completed: false,
      isEditing: false
    },
    {
      id: 2,
      title: "Go do the dishes",
      completed: false,
      isEditing: false
    },
    {
      id: 3,
      title: "Reach Silver at SFV Ranked Matches",
      completed: true,
      isEditing: false
    },
  ])
  const [idForTodo, setIdForTodo] = useState(todos.length + 1)
  const [name, setName] = useState('')
  const nameInputEl = useRef(null)

  function addTodo(todo) {
    setTodos([...todos, {
      id: idForTodo,
      title: todo,
      completed: false,
      isEditing: false
    }])

    setIdForTodo(prevIdForTodo => prevIdForTodo + 1)
  }

  function remainingTodos() {
    return todos.filter(todo => todo.completed === false).length
  }

  const remaining = useMemo(remainingTodos, [todos])

  function clearCompleted() {
    setTodos([...todos].filter(todo => ! todo.completed))
  }

  function checkAllTodos() {
    setTodos([...todos].filter(todo => todo.completed = true))
  }

  function deleteTodo(todoId) {
    setTodos([...todos].filter(todo => todo.id !== todoId))
  }

  function completeTodo(todoId) {
    const updateTodos = todos.map(todo => {
      if (todo.id === todoId) {
        todo.completed = ! todo.completed
      }

      return todo
    })

    setTodos(updateTodos)
  }

  function editTodo(todoId) {
    const updateTodos = todos.map(todo => {
      if (todo.id === todoId) {
        todo.isEditing = true
      }

      return todo
    })

    setTodos(updateTodos)
  }

  function updateTodo(event, id) {
    const updateTodo = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length < 1) {
          todo.isEditing = false
          return todo
        }
        todo.title = event.target.value
        todo.isEditing = false
      }
      return todo
    })

    setTodos(updateTodo)
  }

  function todosFiltered(filter) {
    switch (filter) {
      case 'all':
        return todos;
        break;
      case 'completed':
        return todos.filter(todo => todo.completed)
        break;
      case 'active':
        return todos.filter(todo => ! todo.completed)
        break;
    }
  }

  function cancelEdit(id) {
    const updateTodo = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false
      }
      return todo
    })
    setTodos(updateTodo)
  }

  useEffect(() => {
    nameInputEl.current.focus()
  }, [name])

  return (
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
                   onChange={event => setName(event.target.value)}
            />
          </form>
          { name && <p className="name-label">Hello, {name}</p> }
        </div>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo}/>
        { todos.length > 0 ?
          <TodoList
              completeTodo={completeTodo}
              editTodo={editTodo}
              updateTodo={updateTodo}
              cancelEdit={cancelEdit}
              deleteTodo={deleteTodo}
              remaining={remaining}
              clearCompleted={clearCompleted}
              checkAllTodos={checkAllTodos}
              todosFiltered={todosFiltered}
          />
        :
          <NoTodos />
        }
      </div>
    </div>
  );
}

export default App;