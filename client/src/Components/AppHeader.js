import React, { useContext, useState } from "react";
import Button, { SelectButton } from "./Button";
import styles from "../Styles/App.module.css";
import TodoModal from "./TodoModal";
import ToDoContext from "../Utils/todoContext";

const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const todoContext = useContext(ToDoContext);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Todo
      </Button>
      <input
        className={styles.appSearch}
        type="text"
        placeholder="Search.."
        onChange={(e) => todoContext.searchTextHandler(e.target.value)}
      ></input>
      <SelectButton onChange={(e) => todoContext.updateFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
        <option value="deleted">Deleted</option>
      </SelectButton>
      <TodoModal
        action="add"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default AppHeader;
