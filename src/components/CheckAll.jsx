import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function CheckAll() {

    const { todos, setTodos } = useContext(TodosContext)

    function checkAllTodos() {
        setTodos([...todos].filter(todo => todo.completed = true))
    }

    return (
        <div className="button"
             onClick={checkAllTodos}
        >
            Check All
        </div>
    )

}

export default CheckAll;