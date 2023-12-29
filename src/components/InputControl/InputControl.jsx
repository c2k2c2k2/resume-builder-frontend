import React from "react";
import styles from "./InputControl.module.css";

const InputControl = ({ label, mandatory, ...props }) => {
  return (
    <div className={styles.container}>
      {label && mandatory===true ? (
        <label>
          {label} <span className={styles.madatory}>*</span>
        </label>
      ) : (
        <label>
        {label} 
      </label>
      )}
      <input type="text" {...props} />
    </div>
  );
};

export default InputControl;
