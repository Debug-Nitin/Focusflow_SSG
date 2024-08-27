import React from "react";
import styles from "../Styles/title.module.css";

function PageTitle({ children }) {
  return <p className={styles.title}>{children}</p>;
}

export default PageTitle;
