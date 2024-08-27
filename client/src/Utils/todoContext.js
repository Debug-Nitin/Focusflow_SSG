import React, { useState, useEffect } from "react";
import axios from "axios";
import { getTodos } from "./getTodos";
import { getCompletedTodos } from "./getCompletedTods";
import { getIncompleteTodos } from "./getIncompleteTodos";
import { getSearchedTodos } from "./getSearchedTodos";
import { getDeletedTodos } from "./getDeletedTodos";
import toast from "react-hot-toast";

const ToDoContext = React.createContext();

export const ToDoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    fetchToDos();
    fetchDeletedToDos();
  }, []);

  const fetchToDos = async () => {
    const data = await getTodos();
    setTodos([...data]);
  };
  const fetchDeletedToDos = async () => {
    const data = await getDeletedTodos();
    setDeletedTodos([...data]);
  };

  async function addTodoHandler({ title, description, status }) {
    const response = await axios.post("http://localhost:8080/api/todo", {
      title,
      description,
      status,
      date_created: new Date(),
    });

    if (response.status === 201) {
      const newTodo = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        status: response.data.status,
        date_created: response.data.date_created,
      };
      setTodos((prevData) => [newTodo, ...prevData]);
      toast.success("You have created a new Todo time to achieve it 🎉!", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
    }
  }

  async function updateTodoHandler({ id, title, description, status }) {
    const response = await axios.put("http://localhost:8080/api/todo/" + id, {
      title,
      description,
      status,
      date_created: new Date(),
    });

    if (response.status === 200) {
      fetchToDos();
      // const updatedTodos = [...todos];
      // const index = updatedTodos.findIndex((todo) => todo.id === id);

      // updatedTodos[index] = {
      //   ...updatedTodos[index],
      //   title,
      //   description,
      //   status,
      // };

      // setTodos(updatedTodos);
      toast.success("Todo updated successfully 😀!", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
    } else {
      toast.error("Todo update canceled!", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
    }
  }

  async function deleteTodoHandler({ id }) {
    if (
      window.confirm("Are you sure you want to delete this todo ?") === true
    ) {
      const response = await axios.patch(
        "http://localhost:8080/api/todo/" + id,
        {}
      );

      if (response.status === 200) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        toast.success("You have deleted a todo!", {
          duration: 4000,
          style: { fontSize: "20px", padding: "20px" },
        });
      }
    } else {
      toast.error("Delete canceled!", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
    }
  }

  async function permDeleteTodoHandler({ id }) {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this todo ?"
      ) === true
    ) {
      const response = await axios.delete(
        "http://localhost:8080/api/todo/" + id,
        {}
      );

      if (response.status === 200) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        fetchDeletedToDos();
        toast.success("Todo permanently deleted", {
          duration: 4000,
          style: { fontSize: "20px", padding: "20px" },
        });
      }
    } else {
      toast.error("Delete canceled!", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
    }
  }

  async function restoreTodoHandler({ id }) {
    if (
      window.confirm("Are you sure you want to restore this todo ?") === true
    ) {
      const response = await axios.patch(
        "http://localhost:8080/api/restore/" + id,
        {}
      );
      if (response.status === 200) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        fetchDeletedToDos();
      }
      toast.success("Todo restored successfully", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
    } else {
      toast.error("Restore canceled!", {
        duration: 4000,
        style: { fontSize: "20px", padding: "20px" },
      });
    }
  }

  async function filterTodoHandler(filter) {
    setSelectedFilter(filter);

    switch (filter) {
      case "incomplete":
        const incompData = await getIncompleteTodos();
        setTodos([...incompData]);
        break;

      case "completed":
        const comData = await getCompletedTodos();
        setTodos([...comData]);
        break;

      case "deleted":
        fetchDeletedToDos();
        break;

      default:
        fetchToDos();

        break;
    }
  }

  async function searchTextHandler(filteredText) {
    if (filteredText.trim() === "") {
      fetchToDos();
    } else {
      const comData = await getSearchedTodos(filteredText);
      setTodos([...comData]);
    }
  }

  return (
    <ToDoContext.Provider
      value={{
        todos: todos,
        selectedFilter: selectedFilter,
        deletedTodos: deletedTodos,
        addTodo: addTodoHandler,
        updateTodo: updateTodoHandler,
        deleteTodo: deleteTodoHandler,
        permDeleteTodo: permDeleteTodoHandler,
        restoreTodo: restoreTodoHandler,
        updateFilter: filterTodoHandler,
        searchTextHandler: searchTextHandler,
      }}
    >
      {props.children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;
