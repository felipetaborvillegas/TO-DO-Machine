import React from "react";
import "../css/TodoSearch.css"

export function TodoSearch({searchValue, setSearchValue}) {

    const onSearchValueChange = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
    };

    return(
        <input
            className="search" 
            placeholder="Search TO-DOs..."
            value={searchValue}
            onChange={onSearchValueChange}
        />
    ); 
}