import React, { useContext } from "react";
import styles from "../Styles/todoitem.module.css";
import { getClasses } from "../Utils/getClasses";
import { MdDeleteForever, MdRestore } from "react-icons/md";
import ToDoContext from "../Utils/todoContext";
import moment from "moment";

//in this function we pass the prop
function TodoDeletedItem({ todo }) {
  const dateCreated = moment(todo?.date_created).format(
    "hh:mm A, DD MMMM, YYYY"
  );
  const todoContext = useContext(ToDoContext);

  const handleRestore = () => {
    todoContext.restoreTodo({ id: todo.id });
  };

  const handlePermanentDelete = () => {
    todoContext.permDeleteTodo({ id: todo.id });
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
          <div className={styles.icon} onClick={handleRestore} role="button">
            <MdRestore />
          </div>
          <div
            className={styles.icon}
            onClick={handlePermanentDelete}
            role="button"
          >
            <MdDeleteForever />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoDeletedItem;
