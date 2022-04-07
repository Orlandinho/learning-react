import {useState} from "react";
import PropTypes from "prop-types";
import TodoItemsRemaining from "./TodoItemsRemaining";
import ClearComplete from "./ClearComplete";
import CheckAll from "./CheckAll";
import TodoFilters from "./TodoFilters";

TodoList.propTypes = {
    completeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    cancelEdit: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    remainingTodos: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    checkAllTodos: PropTypes.func.isRequired,
}

function TodoList(props) {

    const [filter, setFilter] = useState('all')

    return (
        <>
            <ul className="todo-list">
                {props.todosFiltered(filter).map(todo =>
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
                    <CheckAll checkAllTodos={props.checkAllTodos}/>
                </div>
                <TodoItemsRemaining remainingTodos={props.remainingTodos} />
            </div>
            <div className="check-all-container">
                <TodoFilters setFilter={setFilter}
                             filter={filter}
                />
                <div>
                    <ClearComplete clearCompleted={props.clearCompleted}/>
                </div>
            </div>
        </>
    )

}

export default TodoList;