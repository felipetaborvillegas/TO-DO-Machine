import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJedi } from "@fortawesome/free-solid-svg-icons";
import "../css/Item.css"

export function TodoItem (props) {

    return(
        <div>
            <span 
            className="close"
            onClick={props.onDelete}
            >
                X
            </span>
            <li>
                <div className="task">
                    <FontAwesomeIcon 
                        icon={faJedi} 
                        className={props.completed?"done":"undone"} 
                        onClick={props.onCompleted}
                    />
                    <p className={props.completed?"ready":undefined}>{props.text}</p>
                </div>
            </li>
        </div>
    )
}