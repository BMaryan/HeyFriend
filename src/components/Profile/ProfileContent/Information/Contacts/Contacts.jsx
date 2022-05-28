import React from "react";
import styles from "./Contacts.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contacts = (props) => {
  let valueEmail = props?.currentAccount?.data() ? props?.currentAccount?.data()?.email : undefined;

  return <div className={styles.contacts}>{props?.currentAccount?.data()?.email ? <ReturnEmail value={valueEmail} /> : undefined}</div>;
};

let ReturnEmail = (props) => {
  return (
    <div className={styles.wrapper_item}>
      <div className={styles.title}>Email</div>
      <div className={styles.wrapper_content}>
        <div>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
        </div>
        <div className={styles.value}>{props.value}</div>
      </div>
    </div>
  );
};

export default Contacts;
