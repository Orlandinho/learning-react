import { useContext } from "react";
import TodoItemsRemaining from "./TodoItemsRemaining";
import ClearComplete from "./ClearComplete";
import CheckAll from "./CheckAll";
import TodoFilters from "./TodoFilters";
import useToggle from "../custom_hooks/useToggle";
import { TodosContext } from "../context/TodosContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList() {

  const { filter, todos, setTodos } = useContext(TodosContext);

  const [visibleOne, setVisibleOne] = useToggle();
  const [visibleTwo, setVisibleTwo] = useToggle();

  function completeTodo(todoId) {
    const updateTodos = todos.map(todo => {
      if (todo.id === todoId) {
        todo.completed = ! todo.completed
      }

      return todo
    })

    setTodos(updateTodos)
  }

  function deleteTodo(todoId) {
    setTodos([...todos].filter(todo => todo.id !== todoId))
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

  function todosFiltered() {
    switch (filter) {
      case "all":
        return todos;
        break;
      case "completed":
        return todos.filter(todo => todo.completed);
        break;
      case "active":
        return todos.filter(todo => !todo.completed);
        break;
    }
  }

  return (
    <>
      <TransitionGroup component="ul" className="todo-list">
        {todosFiltered().map(todo =>
          <CSSTransition key={todo.id} timeout={300} classNames="slide-horizontal">
            <li className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" checked={!!todo.completed} onChange={() => completeTodo(todo.id)} />
                {!todo.isEditing ?
                  <span className={`todo-item-label ${todo.completed ? "line-through" : ""}`}
                        onDoubleClick={() => editTodo(todo.id)}
                  >
                    {todo.title}
                  </span>
                  :
                  <input type="text"
                         onBlur={event => updateTodo(event, todo.id)}
                         onKeyUp={event => {
                           if (event.key === "Enter") {
                             updateTodo(event, todo.id);
                           } else if (event.key === "Escape") {
                             cancelEdit(todo.id);
                           }
                         }}
                         className="todo-item-input"
                         defaultValue={todo.title}
                         autoFocus
                  />
                }
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
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
          </CSSTransition>
        )}
      </TransitionGroup>

      <div className="toggles-container">
        <button className="button" onClick={setVisibleOne}>Feature One Toggle</button>
        <button className="button" onClick={setVisibleTwo}>Feature Two Toggle</button>
      </div>


      <CSSTransition in={visibleOne}
                     timeout={300}
                     classNames="slide-vertical"
                     unmountOnExit
      >
        <div className="check-all-container">
          <div>
            <CheckAll />
          </div>
          <TodoItemsRemaining />
        </div>
      </CSSTransition>

      <CSSTransition in={visibleTwo}
                     timeout={300}
                     classNames="slide-vertical"
                     unmountOnExit
      >
        <div className="check-all-container">
          <TodoFilters />
          <div>
            <ClearComplete />
          </div>
        </div>
      </CSSTransition>
    </>
  );

}

export default TodoList;