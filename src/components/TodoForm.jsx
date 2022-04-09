import { useContext, useState } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoForm() {

  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext)
  const [todoInput, setTodoInput] = useState('')

  function handleInput(event) {
      setTodoInput(event.target.value)
  }

  function addTodo(event) {
      event.preventDefault()
      if(todoInput.trim().length < 1) {
          return
      }

    setTodos([...todos, {
      id: idForTodo,
      title: todoInput,
      completed: false,
      isEditing: false
    }])

    setIdForTodo(prevIdForTodo => prevIdForTodo + 1)

    setTodoInput('')
  }

  return(
      <form action="/" onSubmit={addTodo}>
          <input type="text"
                 placeholder="What do you need to do?"
                 className="todo-input"
                 value={todoInput}
                 onChange={handleInput}
          />
      </form>
  )

}

export default TodoForm;