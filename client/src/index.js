import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Styles/GlobalStyles.css";
import { ToDoContextProvider } from "./Utils/todoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ToDoContextProvider>
    <App />
  </ToDoContextProvider>
);
