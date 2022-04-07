import {useState} from "react";
import PropTypes from "prop-types";

CheckAll.propTypes = {
    checkAllTodos: PropTypes.func.isRequired
}
function CheckAll(props) {

    return (
        <div className="button"
             onClick={props.checkAllTodos}
        >
            Check All
        </div>
    )

}

export default CheckAll;