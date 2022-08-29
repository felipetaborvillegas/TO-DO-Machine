import React from "react";
import { TodoCounter } from "./TodoCounter";
import {  TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { CreateTodoButton } from "./CreateTodoButton";
import { Modal } from "./Modal";
import { TodoForm } from "./TodoForm";
import "../css/App.css";

export function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoaging] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
  setTimeout(() => {
      try {
      const localStorageItem =  localStorage.getItem(itemName);  
      let parsedItem;
      
      if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
      } else {
          parsedItem = JSON.parse(localStorageItem);
      }
      setItem(parsedItem); 
      setLoaging(false);
      } catch(error) {
  setError(error);
      }
  }, 1000)
  })
  const saveItem = (newItem) => {
  try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
  } catch(error) {
      setError(error)
  }
  }

  return {
  item,
  saveItem,
  loading,
  error
  };
}

function App(props) { 

  const {item, saveItem, loading, error} = useLocalStorage("Item_V1", []);

    const [searchValue, setSearchValue] = React.useState("");
    const [openModal, setOpenModal] = React.useState(false);
    const completedItem = item.filter(todo => todo.completed).length;
    const totalItem = item.length;

    let searchedItem = [];

    if (searchValue.length === 0) {
    searchedItem = item;
    } else {
    searchedItem = item.filter(todo => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
    })
    }

    const AddItem = (text) => {
      const newItem = [...item];
      newItem.push({
        completed: false,
        text: text
      })
      saveItem(newItem);
      } 

    const completeItem = (text) => {
    const todoIndex = item.findIndex(todo => todo.text === text);
    const newItem = [...item];
    newItem[todoIndex].completed = !newItem[todoIndex].completed;
    saveItem(newItem);
    } 

    const deleteItem = (text) => {
    const newItem = item.filter(todo => todo.text !== text);
    saveItem(newItem)
    }

  return (
    <div className="main-container">
      <TodoCounter
        total={totalItem}
        completed={completedItem}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList
        error={error}
        loading={loading}
        searchedItemLength = {searchedItem.length}
      >
        {searchedItem.map(todo => (
          <TodoItem 
          key={todo.text} 
          text={todo.text}
          completed={todo.completed}
          onCompleted={() => completeItem(todo.text)}
          onDelete={() => deleteItem(todo.text)}
          />
        ))}
      </TodoList>
      {openModal && (
      <Modal>
          <TodoForm
            saveTodo={saveItem} 
            addTodo={AddItem}
            setOpenModal={setOpenModal}
          />
      </Modal>)}

      <CreateTodoButton
        setOpenModal={setOpenModal}
      />
    </div>
);
}

export default App;
