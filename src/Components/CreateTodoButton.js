import React from "react";
import "../css/TodoButton.css"

export function CreateTodoButton({setOpenModal}) {

    return(
        <div 
            className="button-container" 
            onClick={() => setOpenModal(prevState => !prevState)}>
            <button className="initial-button">+</button>
        </div>
    )
}