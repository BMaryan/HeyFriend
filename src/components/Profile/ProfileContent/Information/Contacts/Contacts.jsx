import React from "react";
import styles from "./Contacts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Contacts = (props) => {
  let valueEmail = props.account && !props.id ? props.account.profile.email : props.otherProfile ? props.otherProfile.profile.email : undefined;

  return <div className={styles.contacts}>{props.account && props.account.profile && props.account.profile.email ? <ReturnEmail value={valueEmail} /> : undefined}</div>;
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
