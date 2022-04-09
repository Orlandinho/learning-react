import { useContext, useMemo, useState } from "react";
import { TodosContext } from "../context/TodosContext";


function TodoItemsRemaining() {

    const {todos} = useContext(TodosContext)

    function remainingTodos() {
        return todos.filter(todo => todo.completed === false).length
    }

    const remaining = useMemo(remainingTodos, [todos])

    return (
        <span>{remaining} items remaining</span>
    )

}

export default TodoItemsRemaining;