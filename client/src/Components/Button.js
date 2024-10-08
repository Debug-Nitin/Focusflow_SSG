import React from "react";
import styles from "../Styles/button.module.css";
import { getClasses } from "../Utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ children, type, variant, ...rest }) => {
  return (
    <button
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, ...rest }) => {
  return (
    <select
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
