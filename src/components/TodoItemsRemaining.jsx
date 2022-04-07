import {useState} from "react";
import PropTypes from "prop-types";

TodoItemsRemaining.propTypes = {
    remainingTodos: PropTypes.func.isRequired
}

function TodoItemsRemaining(props) {

    return (
        <span>{props.remainingTodos().length} items remaining</span>
    )

}

export default TodoItemsRemaining;