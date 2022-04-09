import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function ClearComplete() {

    const { todos, setTodos } = useContext(TodosContext)

    function clearCompleted() {
        setTodos([...todos].filter(todo => ! todo.completed))
    }

    return (
        <button className="button"
                onClick={clearCompleted}
        >
            Clear Completed
        </button>
    )

}

export default ClearComplete;