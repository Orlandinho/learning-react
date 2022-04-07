import {useState} from "react";
import PropTypes from "prop-types";

ClearComplete.propTypes = {
    clearCompleted: PropTypes.func.isRequired
}

function ClearComplete(props) {

    return (
        <button className="button"
                onClick={props.clearCompleted}
        >
            Clear Completed
        </button>
    )

}

export default ClearComplete;