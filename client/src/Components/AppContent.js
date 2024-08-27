import { useContext } from "react";
import styles from "../Styles/App.module.css";
import TodoItem from "./TodoItem";
import TodoDeletedItem from "./TodoDeletedItem";
import ToDoContext from "../Utils/todoContext";

function AppContent() {
  const todoContext = useContext(ToDoContext);
  const { todos, selectedFilter, deletedTodos } = todoContext;

  let componentToRender;
  if (selectedFilter === "deleted") {
    componentToRender =
      deletedTodos && deletedTodos.length > 0 ? (
        deletedTodos.map((todo) => (
          <TodoDeletedItem key={todo.id} id={todo.id} todo={todo} />
        ))
      ) : (
        <p
          style={{ fontSize: "8rem", textAlign: "center", marginTop: "10rem" }}
        >
          No todos deleted
        </p>
      );
  } else {
    componentToRender =
      todos && todos.length > 0 ? (
        todos.map((todo) => <TodoItem key={todo.id} id={todo.id} todo={todo} />)
      ) : (
        <p
          style={{ fontSize: "8rem", textAlign: "center", marginTop: "10rem" }}
        >
          No todos left
        </p>
      );
  }

  return <div className={styles.content__wrapper}>{componentToRender}</div>;
}

export default AppContent;
