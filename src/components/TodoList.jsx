import {useState} from "react";
import PropTypes from "prop-types";
import TodoForm from "./TodoForm";

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    completeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    remainingTodos: PropTypes.func.isRequired,
}

function TodoList(props) {

    return (
        <>
            <ul className="todo-list">
                {props.todos.map(todo =>
                    <li key={todo.id} className="todo-item-container">
                        <div className="todo-item">
                            <input type="checkbox" checked={!!todo.completed} onChange={() => props.completeTodo(todo.id)}/>
                            {!todo.isEditing ?
                                <span className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}
                                      onDoubleClick={() => props.editTodo(todo.id)}
                                >
                  {todo.title}
                  </span>
                                :
                                <input type="text"
                                       onBlur={event => props.updateTodo(event, todo.id)}
                                       onKeyUp={event => {
                                           if (event.key === 'Enter') {
                                               props.updateTodo(event, todo.id)
                                           } else if (event.key === 'Escape') {
                                               props.cancelEdit(todo.id)
                                           }
                                       }}
                                       className="todo-item-input"
                                       defaultValue={todo.title}
                                       autoFocus
                                />
                            }
                        </div>
                        <button onClick={() => props.deleteTodo(todo.id)} className="x-button">
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
                <span>{props.remainingTodos().length} items remaining</span>
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
        </>
    )

}

export default TodoList;