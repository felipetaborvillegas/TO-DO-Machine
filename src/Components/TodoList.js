import React from "react";
import "../css/TodoList.css";

export function TodoList (props) {
    return(
        <section>
            {props.children}
            {props.error && <p>Desesperate, hubo un error...</p>}
            {props.loading && <p>Estamos cargando, no desesperes...</p>}
            {(!props.loading && !props.searchedItemLength) && <p>Crea tu primer TODO!</p>}
        </section>
    )
}