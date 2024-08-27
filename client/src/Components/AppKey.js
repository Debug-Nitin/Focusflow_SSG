import React from "react";
import styles from "../Styles/AppKey.module.css";

const AppKey = () => {
  return (
    <div className={styles.legend}>
      <p>Todo legend:</p>
      <p>
        <span className={styles.incomplete}></span>Incomplete todos
      </p>
      <p>
        <span className={styles.completed}></span>Completed todos
      </p>
    </div>
  );
};

export default AppKey;
