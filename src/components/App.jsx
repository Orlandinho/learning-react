import "../App.css";
import {useState} from "react";

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
  const [todoInput, setTodoInput] = useState('')
  const [idForTodo, setIdForTodo] = useState(todos.length + 1)

  function addTodo(event) {
    event.preventDefault()
    if(todoInput.trim().length < 1) return
    setTodos([...todos, {
      id: idForTodo,
      title: todoInput,
      completed: false,
      isEditing: false
    }])

    setTodoInput('')
    setIdForTodo(prevIdForTodo => prevIdForTodo + 1)
  }

  function handleInput(event) {
    setTodoInput(event.target.value)
  }

  function remainingTodos() {
    return todos.filter(todo => todo.completed === false)
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

  function cancelEdit(id) {
    const updateTodo = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false
      }
      return todo
    })

    setTodos(updateTodo)
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="/" onSubmit={addTodo}>
          <input type="text"
                 placeholder="What do you need to do?"
                 className="todo-input"
                 value={todoInput}
                 onChange={handleInput}
          />
        </form>

        <ul className="todo-list">
          { todos.map( todo =>
            <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input type="checkbox" checked={!!todo.completed} onChange={() => completeTodo(todo.id)} />
              {! todo.isEditing ?
                <span className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}
                      onDoubleClick={() => editTodo(todo.id)}
                >
                {todo.title}
                </span>
                :
                <input type="text"
                       onBlur={event => updateTodo(event, todo.id)}
                       onKeyUp={event => {if (event.key === 'Enter') {
                         updateTodo(event, todo.id)
                       } else if(event.key === 'Escape') {
                         cancelEdit(todo.id)
                       }}}
                       className="todo-item-input"
                       defaultValue={todo.title}
                       autoFocus
                />
              }
            </div>
            <button onClick={ () => deleteTodo(todo.id) } className="x-button">
              <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
          )}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>
          <span>{ remainingTodos().length } items remaining</span>
        </div>
        <div className="check-all-container">
          <div>
            <button className="button filter-button filter-button-active">All</button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
