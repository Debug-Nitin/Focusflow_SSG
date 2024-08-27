import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/modal.module.css";
import Button from "./Button";
import ToDoContext from "../Utils/todoContext";
import toast from "react-hot-toast";

function TodoModal({ modalOpen, setModalOpen, todo, action }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const todoContext = useContext(ToDoContext);

  //use effect to update the state incase type is update
  useEffect(() => {
    if (action === "update" && todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("incomplete");
    }
  }, [action, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      toast.error("Todo title cannot be empty!", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
      return;
    }

    if (title && status) {
      if (action === "add") {
        todoContext.addTodo({ title, description, status });
      }
      if (action === "update") {
        if (
          todo.title !== title ||
          todo.status !== status ||
          todo.description !== description
        ) {
          setTitle(todo.title);
          setStatus(todo.status);
          setDescription(todo.description);
          todoContext.updateTodo({ id: todo.id, title, description, status });
        }
      }
    }
    setModalOpen(false);

    // if (title && status) {
    //   if (action === "add") {
    //     setDate_created("");
    //     axios.post("http://localhost:8080/api/todo", {
    //       title,
    //       description,
    //       status,
    //       date_created,
    //     });
    //     alert("todo added successfully");
    //   }
    //   if (action === "update") {
    //     if (
    //       todo.title !== title ||
    //       todo.status !== status ||
    //       todo.description !== description
    //     ) {
    //       setTitle(todo.title);
    //       setStatus(todo.status);
    //       setDescription(todo.description);
    //       axios.put("http://localhost:8080/api/todo/" + todo.id, {
    //         title,
    //         description,
    //         status,
    //       });
    //       alert("todo updated successfully");
    //     }
    //   }

    // }
  };

  return (
    <>
      {modalOpen && (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {action === "add" ? "ADD" : "Update"} Todo
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  autoFocus="true"
                  maxLength={25}
                  placeholder="Write todo title in 25 chars"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="Description">
                Description
                <textarea
                  id="description"
                  value={description}
                  maxLength={200}
                  placeholder="Write todo title in 200 chars"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Complete</option>
                </select>
                <div className={styles.buttonContainer}>
                  <Button type="submit" variant="primary">
                    {action === "add" ? "Add" : "Update"} Task
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </label>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoModal;
