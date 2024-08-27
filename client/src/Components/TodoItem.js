import React, { useState, useContext } from "react";
import styles from "../Styles/todoitem.module.css";
import { getClasses } from "../Utils/getClasses";
import TodoModal from "./TodoModal";
import { MdDelete, MdEdit } from "react-icons/md";
import ToDoContext from "../Utils/todoContext";
import moment from "moment";

//in this function we pass the prop
function TodoItem({ todo }) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const dateCreated = moment(todo?.date_created).format(
    "hh:mm A, DD MMMM, YYYY"
  );
  const todoContext = useContext(ToDoContext);

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleDelete = () => {
    todoContext.deleteTodo({ id: todo.id });
  };
  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <div className={styles.texts}>
            <div
              className={getClasses([
                styles.todotext,
                todo.status === "completed" && styles["todoText--completed"],
              ])}
            >
              <p>{todo.title}</p>
              <p>{todo.description}</p>
            </div>
            <p className={styles.time}>{dateCreated}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div className={styles.icon} onClick={handleUpdate} role="button">
            <MdEdit />
          </div>
          <div className={styles.icon} onClick={handleDelete} role="button">
            <MdDelete />
          </div>
        </div>
      </div>
      <TodoModal
        action="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
