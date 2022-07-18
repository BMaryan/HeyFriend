import React from "react";
import styles from "./Default.module.scss";

interface DefaultPropsType {}

const Default = (props: DefaultPropsType) => {
  return (
    <div className={styles.default}>
      <div>{/* <FontAwesomeIcon className={styles.icon} icon={faUserEdit} /> */}</div>
      <div className={styles.title}>Your editor</div>
      <div className={styles.subtitle}>Choose what you want to edit</div>
    </div>
  );
};

export default Default;
